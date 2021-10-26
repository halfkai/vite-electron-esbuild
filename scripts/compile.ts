import esbuild, { BuildOptions } from 'esbuild'
import config from './configs'

export default (options?: BuildOptions) => {
  // const isDevelopment = process.env.NODE_ENV === 'development'
  return esbuild.build({
    outdir: config.outDir,
    entryPoints: [
      config.mainEntry,
      config.preloadEntry
    ],
    format: 'cjs',
    logLevel: 'info',
    incremental: true,
    ...options
  })
}
