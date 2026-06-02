"use client"

import { Fragment, useMemo, useState, type ReactNode } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Columns3,
  Loader2,
  Search,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type DataGridDensity = "spacious" | "default" | "compact"

type DataGridColumnMeta = {
  headerClassName?: string
  cellClassName?: string
}

const densityStyles: Record<
  DataGridDensity,
  {
    rootGap: string
    toolbarGap: string
    input: string
    header: string
    cell: string
    skeleton: string
    expanded: string
    empty: string
    footer: string
    footerButton: string
  }
> = {
  spacious: {
    rootGap: "gap-4",
    toolbarGap: "gap-4",
    input: "h-10 pl-9 text-sm",
    header: "h-11 px-3",
    cell: "h-12 px-3 py-2.5",
    skeleton: "h-3.5",
    expanded: "p-5",
    empty: "h-40",
    footer: "gap-4 text-sm",
    footerButton: "h-8 w-8",
  },
  default: {
    rootGap: "gap-3",
    toolbarGap: "gap-3",
    input: "h-9 pl-8 text-sm",
    header: "h-10 px-2",
    cell: "h-10 px-2 py-2",
    skeleton: "h-3",
    expanded: "p-4",
    empty: "h-32",
    footer: "gap-3 text-xs",
    footerButton: "h-7 w-7",
  },
  compact: {
    rootGap: "gap-3",
    toolbarGap: "gap-3",
    input: "h-8 pl-8 text-sm",
    header: "h-8 px-2",
    cell: "h-8 px-2 py-1.5",
    skeleton: "h-3",
    expanded: "p-3",
    empty: "h-28",
    footer: "gap-3 text-xs",
    footerButton: "h-7 w-7",
  },
}

interface DataGridProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  pageSize?: number
  rowSelection?: boolean
  columnVisibility?: boolean
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  density?: DataGridDensity
  striped?: boolean
  cellBorders?: boolean
  stickyHeader?: boolean
  renderExpandedRow?: (row: Row<TData>) => ReactNode
  className?: string
}

function DataGrid<TData, TValue = unknown>({
  columns: userColumns,
  data,
  searchKey,
  searchPlaceholder = "Search…",
  pageSize = 8,
  rowSelection: enableRowSelection = false,
  columnVisibility: enableColumnVisibility = true,
  loading = false,
  emptyTitle = "No rows found",
  emptyDescription = "Try changing the search or filters.",
  density = "spacious",
  striped = false,
  cellBorders = false,
  stickyHeader = false,
  renderExpandedRow,
  className,
}: DataGridProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({})
  const [columnVisibilityState, setColumnVisibilityState] = useState<VisibilityState>({})

  const columns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    const displayColumns: ColumnDef<TData, unknown>[] = []

    if (enableRowSelection) {
      displayColumns.push({
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 48,
        meta: {
          headerClassName: "w-12 min-w-12 !px-3",
          cellClassName: "w-12 min-w-12 !px-3",
        },
      })
    }

    if (renderExpandedRow) {
      displayColumns.push({
        id: "expand",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getIsExpanded() ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronsUpDown className="size-3.5" />
              )}
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 48,
        meta: {
          headerClassName: "w-12 min-w-12 !px-3",
          cellClassName: "w-12 min-w-12 !px-3",
        },
      })
    }

    return [...displayColumns, ...(userColumns as ColumnDef<TData, unknown>[])]
  }, [enableRowSelection, renderExpandedRow, userColumns])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection: rowSelectionState,
      columnVisibility: columnVisibilityState,
    },
    enableRowSelection,
    getRowCanExpand: () => Boolean(renderExpandedRow),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelectionState,
    onColumnVisibilityChange: setColumnVisibilityState,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: { pagination: { pageSize } },
  })

  const searchColumn = searchKey ? table.getColumn(searchKey) : null
  const visibleColumnCount = table.getVisibleLeafColumns().length
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length
  const pageCount = Math.max(table.getPageCount(), 1)
  const styles = densityStyles[density]

  return (
    <div className={cn("flex w-full min-w-0 flex-col", styles.rootGap, className)}>
      <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between", styles.toolbarGap)}>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={String(searchColumn?.getFilterValue() ?? "")}
            onChange={(event) => searchColumn?.setFilterValue(event.target.value)}
            className={styles.input}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {enableRowSelection ? (
            <Badge variant="secondary" className="h-8 rounded-md px-2.5">
              {selectedCount} selected
            </Badge>
          ) : null}

          {enableColumnVisibility ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1.5">
                  <Columns3 className="size-3.5" />
                  Columns
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-56 gap-2 p-2">
                {table
                  .getAllLeafColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <label
                      key={column.id}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                    >
                      <Checkbox
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      />
                      <span className="capitalize text-muted-foreground">
                        {column.id.replace(/[-_]/g, " ")}
                      </span>
                    </label>
                  ))}
              </PopoverContent>
            </Popover>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-background shadow-xs">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-background")}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap bg-muted/40",
                        styles.header,
                        cellBorders && "border-r border-border last:border-r-0",
                        (header.column.columnDef.meta as DataGridColumnMeta | undefined)
                          ?.headerClassName
                      )}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-left transition-colors hover:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="size-3" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="size-3" />
                          ) : (
                            <ArrowUpDown className="size-3 text-muted-foreground/60" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: Math.min(pageSize, 5) }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {table.getVisibleLeafColumns().map((column) => (
                      <TableCell
                          key={column.id}
                          className={cn(
                          "bg-inherit whitespace-nowrap",
                          styles.cell,
                          cellBorders && "border-r border-border last:border-r-0",
                          (column.columnDef.meta as DataGridColumnMeta | undefined)
                            ?.cellClassName
                        )}
                      >
                        <div className={cn("w-full max-w-28 animate-pulse rounded bg-muted", styles.skeleton)} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className={cn(
                        striped && rowIndex % 2 === 1 && "bg-muted/25",
                        "hover:bg-muted/40 hover:[&>td]:bg-muted/40 data-[state=selected]:bg-primary/5 data-[state=selected]:[&>td]:bg-primary/5"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "bg-inherit whitespace-nowrap",
                            styles.cell,
                            cellBorders && "border-r border-border last:border-r-0",
                            (cell.column.columnDef.meta as DataGridColumnMeta | undefined)
                              ?.cellClassName
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && renderExpandedRow ? (
                      <TableRow>
                        <TableCell
                          colSpan={visibleColumnCount}
                          className={cn("bg-muted/30", styles.expanded)}
                        >
                          {renderExpandedRow(row)}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={visibleColumnCount} className={cn("text-center", styles.empty)}>
                    <div className="mx-auto flex max-w-sm flex-col items-center gap-1.5">
                      <div className="text-sm font-medium text-foreground">{emptyTitle}</div>
                      <div className="text-sm text-muted-foreground">{emptyDescription}</div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className={cn("flex flex-col text-muted-foreground sm:flex-row sm:items-center sm:justify-between", styles.footer)}>
        <div className="flex items-center gap-2">
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
          <span>{totalCount} row(s)</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className={cn("p-0", styles.footerButton)}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <span className="px-2">
            Page {table.getState().pagination.pageIndex + 1} of {pageCount}
          </span>
          <Button
            size="sm"
            variant="outline"
            className={cn("p-0", styles.footerButton)}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { DataGrid }
