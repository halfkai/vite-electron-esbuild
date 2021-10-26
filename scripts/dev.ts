import chalk from 'chalk'
import config from '../config'
import compile from './compile'
import { runElectron } from './run-electron'
import { runVite } from './run-vite'

runVite().then((server) => {
  const closeServer = async () => {
    await server.close()
  }
  compile({
    watch: {
      onRebuild: (error) => {
        if (error) {
          console.log(chalk.red(`[electron] ${error}`))
        } else {
          runElectron(config.outDir, closeServer)
        }
      }
    }
  }).then(() => {
    runElectron(config.outDir, closeServer)
  })
})
