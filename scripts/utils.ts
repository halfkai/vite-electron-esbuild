import chalk from 'chalk'
import os from 'os'

export interface CompileError {
  location: {
    column: number
    file: string
    length: number
    line: number
    lineText: string
  }
  message: string
}

function repeatString (char: string, len: number): string {
  return Array(len).fill(char).join('')
}

function formatCompileError (error: CompileError): string {
  const pathMessage =
    chalk.cyan(error.location.file) +
    ':' +
    chalk.yellow(error.location.line) +
    ':' +
    chalk.yellow(error.location.column)
  const categoryMessage = chalk.red('error:')

  const code =
    chalk.gray(error.location.line) +
    ' ' +
    error.location.lineText +
    os.EOL +
    repeatString(
      ' ',
      error.location.column + `${error.location.line}`.length + 1 + 1
    ) +
    chalk.red(repeatString('~', error.location.length)) +
    repeatString(
      ' ',
      error.location.lineText.length -
        error.location.column -
        error.location.length
    )

  return `${pathMessage} - ${categoryMessage} ${error.message} ${os.EOL} ${code}`
}

export function formatDiagnosticsMessage (errors: CompileError[]): string {
  const messages = errors.map((e) => formatCompileError(e))
  const errorMessage = `Found ${errors.length} errors. Watching for file changes.`

  let diagnosticDetail = ''
  messages.forEach((item, index, { length }) => {
    diagnosticDetail += item
      .split(os.EOL)
      .map((i) => '  ' + i)
      .join(os.EOL)
    if (index + 1 !== length) {
      diagnosticDetail += os.EOL
    }
  })

  const res =
    chalk.rgb(
      255,
      161,
      237
    )('[script] Some typescript compilation errors occurred:') +
    '\n' +
    diagnosticDetail +
    '\n' +
    chalk.rgb(255, 161, 237)(errorMessage)

  return res
}

export const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))
