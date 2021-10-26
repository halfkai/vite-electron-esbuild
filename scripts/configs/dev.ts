import { join } from 'path'

export const outDir = join(process.cwd(), './dist')
export const mainEntry = join(process.cwd(), './packages/main/index.ts')
export const preloadEntry = join(process.cwd(), './packages/preload/index.ts')
export const sourcemap = true
