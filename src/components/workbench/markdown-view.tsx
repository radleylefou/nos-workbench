import ReactMarkdown from "react-markdown"

import { cn } from "@/lib/utils"

type MarkdownViewProps = {
  source: string
  className?: string
}

export function MarkdownView({ source, className }: MarkdownViewProps) {
  return (
    <article
      className={cn(
        "max-w-3xl text-sm leading-7 text-foreground/90",
        className,
      )}
    >
      <ReactMarkdown
        components={{
          h1: (props) => (
            <h1
              {...props}
              className="mt-2 mb-6 text-3xl font-semibold tracking-tight"
            />
          ),
          h2: (props) => (
            <h2
              {...props}
              className="mt-10 mb-3 text-xl font-semibold tracking-tight"
            />
          ),
          h3: (props) => (
            <h3
              {...props}
              className="mt-6 mb-2 text-base font-semibold tracking-tight"
            />
          ),
          p: (props) => <p {...props} className="my-3" />,
          ul: (props) => (
            <ul {...props} className="my-3 list-disc space-y-1 pl-6" />
          ),
          ol: (props) => (
            <ol {...props} className="my-3 list-decimal space-y-1 pl-6" />
          ),
          li: (props) => <li {...props} />,
          a: (props) => (
            <a
              {...props}
              className="text-primary underline underline-offset-4 hover:no-underline"
            />
          ),
          code: ({ className: cls, children, ...rest }) => {
            const isInline = !cls?.includes("language-")
            if (isInline) {
              return (
                <code
                  {...rest}
                  className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
                >
                  {children}
                </code>
              )
            }
            return (
              <code {...rest} className={cls}>
                {children}
              </code>
            )
          },
          pre: (props) => (
            <pre
              {...props}
              className="my-4 overflow-x-auto rounded-md bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100 ring-1 ring-foreground/10"
            />
          ),
          hr: () => <hr className="my-8 border-border" />,
          blockquote: (props) => (
            <blockquote
              {...props}
              className="my-4 border-l-2 border-border pl-4 text-muted-foreground italic"
            />
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </article>
  )
}
