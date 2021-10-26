import compile from './compile'
import { COMPILE_SUCC } from './messages'

compile().then(() => {
  console.log(COMPILE_SUCC)
  process.exit()
})
