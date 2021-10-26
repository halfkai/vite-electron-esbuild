import { BrowserWindow, app } from 'electron'
import path from 'path'

const isDevelopment = process.env.NODE_ENV === 'development'

let mainWindow: BrowserWindow | null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, '../preload/index.js')
    }
  })
  if (isDevelopment) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(process.env.VITE_HOST || 'http://localhost:5000')
  } else {
    mainWindow.loadURL('app://../renderer/index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
})
