import chalk from 'chalk'

import compile from './compile'

import builder from 'electron-builder'
import { formatCMDArg } from './utils'
import path from 'path'

compile().then(() => {
  const { Platform } = builder
  const kwargs = process.argv.slice(2).reduce((acc, cur) => Object.assign(acc, formatCMDArg(cur)), {
    platform: process.platform
  })

  console.log(kwargs.platform, kwargs.platform === 'win32', typeof kwargs.platform)

  let buildPlatform = null
  if (kwargs.platform === 'win32') {
    chalk.green('start to pack windows exe...')
    buildPlatform = Platform.WINDOWS
  } else if (kwargs.platform === 'darwin') {
    buildPlatform = Platform.MAC
  } else if (kwargs.platform === 'linux') {
    buildPlatform = Platform.LINUX
  } else {
    process.exit(1)
  }

  builder.build({
    targets: buildPlatform.createTarget(),
    config: {
      appId: 'vite-electron-build',
      productName: 'vite-electron-build',
      copyright: 'Copyright © 2021 halfkai<0x158105@gmail.com>',
      directories: {
        buildResources: 'resources',
        output: 'dist_electron'
      },
      files: [
        'dist'
      ],
      icon: path.join(__dirname, '../resources/app.png')
    }
  }).then(() => {
    process.exit()
  }).catch((e) => {
    console.log(e)
    process.exit(1)
  })
})
