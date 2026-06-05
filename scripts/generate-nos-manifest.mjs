import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

const root = process.cwd()
const WORKBENCH_URL = "https://nos-workbench.vercel.app"
const MANIFEST_URL = `${WORKBENCH_URL}/nos-manifest.json`

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8")
}

function parseSource(relativePath) {
  const fullPath = path.join(root, relativePath)
  const kind = relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  return ts.createSourceFile(fullPath, fs.readFileSync(fullPath, "utf8"), ts.ScriptTarget.Latest, true, kind)
}

function literalToValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text
  }

  if (ts.isNumericLiteral(node)) {
    return Number(node.text)
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => literalToValue(element))
  }

  if (ts.isObjectLiteralExpression(node)) {
    const value = {}

    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue

      const name = property.name
      const key =
        ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)
          ? name.text
          : undefined

      if (!key) continue
      value[key] = literalToValue(property.initializer)
    }

    return value
  }

  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node)) {
    return literalToValue(node.expression)
  }

  if (ts.isParenthesizedExpression(node)) {
    return literalToValue(node.expression)
  }

  if (ts.isIdentifier(node)) {
    return node.text
  }

  return node.getText()
}

function exportedArray(sourceFile, name) {
  let found = null

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === name &&
      node.initializer
    ) {
      found = literalToValue(node.initializer)
      return
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return Array.isArray(found) ? found : []
}

function parseCssVariables(css) {
  const variables = {}
  const rootStart = css.indexOf(":root")
  const open = css.indexOf("{", rootStart)
  let depth = 0
  let close = -1

  for (let i = open; i < css.length; i += 1) {
    const char = css[i]
    if (char === "{") depth += 1
    if (char === "}") depth -= 1
    if (depth === 0) {
      close = i
      break
    }
  }

  const rootBlock = close > open ? css.slice(open + 1, close) : css
  const variablePattern = /--([A-Za-z0-9-_]+)\s*:\s*([^;]+);/g
  let match

  while ((match = variablePattern.exec(rootBlock))) {
    variables[`--${match[1]}`] = match[2].replace(/\/\*.*?\*\//g, "").trim()
  }

  return variables
}

function pickVariables(variables, prefixes) {
  return Object.fromEntries(
    Object.entries(variables).filter(([name]) =>
      prefixes.some((prefix) => name === prefix || name.startsWith(`${prefix}-`)),
    ),
  )
}

function normalizeName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "")
}

function titleToComponentName(title) {
  return title
    .replace(/&/g, " ")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function extractStringLiteralUnion(typeText) {
  return Array.from(typeText.matchAll(/"([^"]+)"/g), (match) => match[1]).filter(
    (value, index, array) => array.indexOf(value) === index,
  )
}

function propSource(declarations, componentFile) {
  if (!declarations?.length) return "unknown"

  const fileNames = declarations.map((declaration) =>
    path.relative(root, declaration.getSourceFile().fileName).replaceAll(path.sep, "/"),
  )

  if (fileNames.some((fileName) => fileName === componentFile)) return "custom"
  if (fileNames.some((fileName) => fileName.includes("node_modules/@types/react"))) return "inherited"
  if (fileNames.some((fileName) => fileName.includes("node_modules/typescript"))) return "inherited"
  if (fileNames.some((fileName) => fileName.includes("node_modules"))) return "third-party"
  if (fileNames.some((fileName) => fileName.startsWith("src/"))) return "local"
  return "external"
}

function propDocs(declarations) {
  if (!declarations?.length) return undefined
  const comments = ts.getJSDocCommentsAndTags(declarations[0])
  const text = comments
    .map((comment) => comment.getText().replace(/^\/\*\*?/, "").replace(/\*\/$/, "").replace(/^\s*\*\s?/gm, "").trim())
    .filter(Boolean)
    .join("\n")

  return text || undefined
}

function exportedDeclarationsForFile(sourceFile) {
  const explicitExports = new Set()
  const directExports = new Set()
  const declarations = new Map()

  function rememberDeclaration(name, node) {
    declarations.set(name, node)
    const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
    if (modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      directExports.add(name)
    }
  }

  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      rememberDeclaration(node.name.text, node)
    }

    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      rememberDeclaration(node.name.text, node)
    }

    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const element of node.exportClause.elements) {
        explicitExports.add(element.name.text)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return new Map(
    [...new Set([...directExports, ...explicitExports])]
      .filter((name) => /^[A-Z]/.test(name) && declarations.has(name))
      .map((name) => [name, declarations.get(name)]),
  )
}

function createProgram() {
  const configPath = ts.findConfigFile(root, ts.sys.fileExists, "tsconfig.json")
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile)
  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root)
  const uiFiles = fs
    .readdirSync(path.join(root, "src/components/ui"))
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => path.join(root, "src/components/ui", file))

  return ts.createProgram({
    rootNames: Array.from(new Set([...parsedConfig.fileNames, ...uiFiles])),
    options: {
      ...parsedConfig.options,
      noEmit: true,
      skipLibCheck: true,
    },
  })
}

function extractComponentExports() {
  const program = createProgram()
  const checker = program.getTypeChecker()
  const result = new Map()

  for (const sourceFile of program.getSourceFiles()) {
    const relative = path.relative(root, sourceFile.fileName).replaceAll(path.sep, "/")
    if (!relative.startsWith("src/components/ui/") || !relative.endsWith(".tsx")) continue

    const declarations = exportedDeclarationsForFile(sourceFile)
    const exports = []

    for (const [name, declaration] of declarations) {
      const target = ts.isVariableDeclaration(declaration) && declaration.name ? declaration.name : declaration
      const type = checker.getTypeAtLocation(target)
      const signatures = type.getCallSignatures()
      if (!signatures.length) continue

      const firstParam = signatures[0].getParameters()[0]
      const paramType = firstParam
        ? checker.getTypeOfSymbolAtLocation(firstParam, declaration)
        : undefined
      const props = paramType
        ? checker
            .getPropertiesOfType(paramType)
            .map((prop) => {
              const declarations = prop.getDeclarations() ?? []
              const propType = checker.getTypeOfSymbolAtLocation(prop, declarations[0] ?? declaration)

              return {
                name: prop.getName(),
                type: checker.typeToString(propType),
                optional: Boolean(prop.flags & ts.SymbolFlags.Optional),
                source: propSource(declarations, relative),
                description: propDocs(declarations),
              }
            })
            .sort((a, b) => {
              const sourceOrder = { custom: 0, local: 1, "third-party": 2, inherited: 3, external: 4, unknown: 5 }
              return sourceOrder[a.source] - sourceOrder[b.source] || a.name.localeCompare(b.name)
            })
        : []

      exports.push({
        name,
        props,
      })
    }

    result.set(relative, exports)
  }

  return result
}

function patternToManifestEntry(pattern) {
  return {
    slug: pattern.slug,
    name: pattern.title,
    description: pattern.description,
    whenToUse: pattern.acceptanceCheck,
    workflow: pattern.workflow,
    layoutVariation: pattern.layoutVariation,
    moduleIds: pattern.moduleIds,
    referenceBuckets: pattern.referenceBuckets,
    composedOf: pattern.composedComponents,
    workbenchUrl: `${WORKBENCH_URL}/workbench/patterns/${pattern.slug}`,
  }
}

function componentToManifestEntry(component, componentExports) {
  const kind = component.manifestKind ?? "primitive"
  const filePath = component.sourcePath ?? `src/components/ui/${component.slug}.tsx`
  const importPath =
    Object.hasOwn(component, "importPath") ? component.importPath : `@/components/ui/${component.slug}`
  const exports = componentExports.get(filePath) ?? []
  const expectedName = normalizeName(titleToComponentName(component.name))
  const expectedPrimaryName = component.primaryExport ? normalizeName(component.primaryExport) : expectedName
  const primaryExport =
    exports.find((item) => normalizeName(item.name) === expectedPrimaryName) ??
    exports[0] ??
    { name: component.primaryExport ?? component.name, props: [] }
  const variantProp = primaryExport.props.find((prop) => prop.name === "variant")
  const sizeProp = primaryExport.props.find((prop) => prop.name === "size")
  const variants = component.variants?.length
    ? component.variants
    : variantProp
      ? extractStringLiteralUnion(variantProp.type)
      : []
  const sizes = sizeProp ? extractStringLiteralUnion(sizeProp.type) : []

  return {
    slug: component.slug,
    name: component.name,
    category: component.category,
    description: component.description,
    whenToUse: component.whenToUse,
    kind,
    importPath,
    sourcePath: filePath,
    workbenchUrl: `${WORKBENCH_URL}/workbench/components/${component.slug}`,
    variants,
    sizes,
    exports,
    props: primaryExport.props,
  }
}

const packageJson = JSON.parse(readText("package.json"))
const registrySource = parseSource("src/lib/component-registry.ts")
const patternsSource = parseSource("src/lib/nos-product-patterns.ts")
const workbenchDataSource = parseSource("src/lib/workbench-data.tsx")
const cssVariables = parseCssVariables(readText("src/app/globals.css"))
const componentExports = extractComponentExports()
const components = exportedArray(registrySource, "components")
const productPatterns = exportedArray(patternsSource, "productPatterns")

const tokens = {
  cssVariables,
  color: {
    variables: pickVariables(cssVariables, [
      "--background",
      "--foreground",
      "--card",
      "--popover",
      "--primary",
      "--secondary",
      "--muted",
      "--accent",
      "--destructive",
      "--border",
      "--input",
      "--ring",
      "--brand",
      "--success",
      "--warning",
      "--error",
      "--info",
      "--chart",
      "--sidebar",
    ]),
    brand: exportedArray(workbenchDataSource, "brandScale"),
    neutral: exportedArray(workbenchDataSource, "neutralScale"),
    semantic: exportedArray(workbenchDataSource, "semanticColorScales"),
  },
  typography: {
    variables: pickVariables(cssVariables, ["--font"]),
    sizes: exportedArray(workbenchDataSource, "typographySizes"),
    weights: exportedArray(workbenchDataSource, "typographyWeights"),
  },
  spacing: {
    scale: exportedArray(workbenchDataSource, "spacingScale"),
  },
  radius: {
    variables: pickVariables(cssVariables, ["--radius"]),
    scale: exportedArray(workbenchDataSource, "radiusScale"),
  },
  shadow: {
    variables: pickVariables(cssVariables, ["--shadow"]),
    scale: exportedArray(workbenchDataSource, "shadowScale"),
  },
  motion: {
    variables: pickVariables(cssVariables, ["--duration", "--ease", "--resize", "--digit", "--badge"]),
    durations: exportedArray(workbenchDataSource, "durationTokens"),
    easings: exportedArray(workbenchDataSource, "easingTokens"),
  },
}

const manifest = {
  version: packageJson.version,
  generatedAt: new Date().toISOString(),
  workbenchUrl: WORKBENCH_URL,
  manifestUrl: MANIFEST_URL,
  counts: {
    components: components.length,
    patterns: productPatterns.length,
  },
  components: components.map((component) => componentToManifestEntry(component, componentExports)),
  tokens,
  patterns: productPatterns.map(patternToManifestEntry),
}

fs.mkdirSync(path.join(root, "public"), { recursive: true })
fs.writeFileSync(
  path.join(root, "public/nos-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
)

console.log(
  `Generated public/nos-manifest.json with ${manifest.counts.components} components and ${manifest.counts.patterns} patterns.`,
)
