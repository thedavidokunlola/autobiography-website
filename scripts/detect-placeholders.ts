import * as fs from 'fs'
import * as path from 'path'

const DATA_DIR = path.join(__dirname, '..', 'data')

/**
 * Detects placeholder patterns like [First Name], [insert URL], etc. inside
 * string values in /data/ files. The regex targets content between quote
 * characters (single, double, or backtick) and checks for square-bracket
 * wrapped words that look like editorial placeholders.
 *
 * Array bracket syntax (e.g. string[]) and TypeScript index signatures are
 * excluded by requiring the bracket content to contain at least one space
 * or look like a placeholder word (all-lowercase with no commas/colons).
 */
function detectPlaceholders(): void {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts') || f.endsWith('.js'))
  const findings: Array<{ file: string; line: number; matched: string }> = []

  // Matches [word word], [INSERT_SOMETHING], [placeholder], etc.
  // Requires either a space inside the brackets or common placeholder patterns.
  // Does NOT match single-word TypeScript types like [string] or array indices like [0].
  const placeholderPattern = /\[(?=[A-Za-z])[A-Za-z0-9_ ]{2,}(?:\s[A-Za-z0-9_ ]+)*\]/g

  for (const file of files) {
    if (file.endsWith('.d.ts')) continue
    const filePath = path.join(DATA_DIR, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Skip import lines, interface/type definitions, and comments
      if (line.trimStart().startsWith('import ')) continue
      if (line.trimStart().startsWith('//')) continue
      if (line.trimStart().startsWith('export interface')) continue
      if (line.trimStart().startsWith('export type')) continue

      // Only check inside string literal values (lines containing quotes)
      // Look for strings that contain [Placeholder Text] patterns
      const stringLiteralPattern = /['"`]([^'"`]*?)['"`]/g
      let strMatch: RegExpExecArray | null

      while ((strMatch = stringLiteralPattern.exec(line)) !== null) {
        const stringContent = strMatch[1]
        let phMatch: RegExpExecArray | null

        // Reset lastIndex for the placeholder pattern
        placeholderPattern.lastIndex = 0
        while ((phMatch = placeholderPattern.exec(stringContent)) !== null) {
          const matched = phMatch[0]
          // Skip common false positives: TypeScript array type annotations
          // and known non-placeholder patterns
          if (
            matched === '[string]' ||
            matched === '[number]' ||
            matched === '[boolean]' ||
            matched === '[object]'
          ) {
            continue
          }
          findings.push({
            file,
            line: i + 1,
            matched,
          })
        }
      }
    }
  }

  if (findings.length > 0) {
    console.error(`\nPlaceholder detection failed with ${findings.length} finding(s):\n`)
    for (const f of findings) {
      console.error(`  ${f.file}:${f.line} — matched: ${f.matched}`)
    }
    console.error('')
    process.exit(1)
  }

  console.log('Placeholder detection passed.')
}

detectPlaceholders()
