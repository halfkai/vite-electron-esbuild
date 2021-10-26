import chalk from 'chalk'
import { resolve } from 'path'
import { createServer } from 'vite'

export const runVite = async () => {
  const server = await createServer({
    configFile: resolve(process.cwd(), 'packages/renderer/vite.config.ts')
  })
  await server.listen()
  const address = server.httpServer?.address()
  if (typeof address === 'object') {
    const host = `http://${address?.address}:${address?.port}`
    console.log(chalk.green(`[vite] Server started at ${host}`))
    process.env.VITE_HOST = host
  }
  return server
}

export default runVite
