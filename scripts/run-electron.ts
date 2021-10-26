import childProcess from 'child_process'
import stream from 'stream'
import chalk from 'chalk'
import { delay } from './utils'

let electronProcess: childProcess.ChildProcess | null = null

const removeJunkTransformOptions: stream.TransformOptions = {
  decodeStrings: false,
  transform: (chunk, encoding, done) => {
    const source = chunk.toString()
    // Example: 2018-08-10 22:48:42.866 Electron[90311:4883863] *** WARNING: Textured window <AtomNSWindow: 0x7fb75f68a770>
    if (
      /\d+-\d+-\d+ \d+:\d+:\d+\.\d+ Electron(?: Helper)?\[\d+:\d+] /.test(
        source
      )
    ) {
      return false
    }
    // Example: [90789:0810/225804.894349:ERROR:CONSOLE(105)] "Uncaught (in promise) Error: Could not instantiate: ProductRegistryImpl.Registry", source: chrome-devtools://devtools/bundled/inspector.js (105)
    if (/\[\d+:\d+\/|\d+\.\d+:ERROR:CONSOLE\(\d+\)\]/.test(source)) {
      return false
    }
    // Example: ALSA lib confmisc.c:767:(parse_card) cannot find card '0'
    if (/ALSA lib [a-z]+\.c:\d+:\([a-z_]+\)/.test(source)) {
      return false
    }
    done(null, chunk)
  }
}

let exitByScripts = false
export const runElectron = async (
  path: string,
  onClose: () => Promise<void>
) => {
  if (electronProcess) {
    process.kill(electronProcess.pid)
    exitByScripts = true
    electronProcess = null
    await delay(500)
  }

  electronProcess = childProcess.spawn('electron', [`${path}/main`])
  electronProcess.on('exit', async (code) => {
    if (!exitByScripts) {
      console.log(chalk.gray(`[electron] exited with code ${code}`))
      await onClose()
      process.exit()
    }
    exitByScripts = true
  })

  const removeElectronLoggerJunkOut = new stream.Transform(
    removeJunkTransformOptions
  )
  const removeElectronLoggerJunkErr = new stream.Transform(
    removeJunkTransformOptions
  )
  electronProcess.stdout?.pipe(removeElectronLoggerJunkOut).pipe(process.stdout)
  electronProcess.stderr?.pipe(removeElectronLoggerJunkErr).pipe(process.stderr)
}
