import * as dev from './dev'
import * as prod from './prod'

const config = process.env.NODE_ENV === 'development' ? dev : prod

export default config
