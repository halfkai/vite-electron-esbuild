import * as dev from './dev'
import * as prod from './prod'
import { join } from 'path'

const config = process.env.NODE_ENV === 'development' ? dev : prod

export default {
  outDir: join(process.cwd(), './dist/electron'),
  mainEntry: join(process.cwd(), './packages/main'),
  preloadEntry: join(process.cwd(), './packages/preload'),
  ...config
}
