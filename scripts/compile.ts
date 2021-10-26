import esbuild, { BuildOptions } from 'esbuild'
import config from '../config'
import glob from 'fast-glob'
import { COMPILE_SUCC } from './messages'

export default async (options?: BuildOptions) => {
  // const isDevelopment = process.env.NODE_ENV === 'development'
  const entryPoints = glob.sync([`${config.mainEntry}/**/*.{ts,tsx}`, `${config.preloadEntry}/**/*.{ts,tsx}`])

  return esbuild.build({
    outdir: config.outDir,
    entryPoints,
    format: 'cjs',
    logLevel: 'info',
    incremental: true,
    ...options
  }).then(() => {
    console.log(COMPILE_SUCC)
  })
}
