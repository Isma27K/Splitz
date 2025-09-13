import { app, BrowserWindow, Menu } from 'electron'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
// Database initialization is performed lazily after user login

// ========== IPCs ============
import { loginIpc } from './IPC/login-IPC'
import { dashboardIpc } from './IPC/Dashboard-IPC'
// ============================

// Get current file path and directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Make these available globally for any CJS modules that need them
globalThis.__filename = __filename
globalThis.__dirname = __dirname

process.env.APP_ROOT = join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = join(process.env.APP_ROOT as string, 'dist-electron')
export const RENDERER_DIST = join(process.env.APP_ROOT as string, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? join(process.env.APP_ROOT as string, 'public') : RENDERER_DIST

let splash: BrowserWindow | null
let win: BrowserWindow | null

function createSplash() {  
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,          // no title bar
    transparent: true,     // nice overlay look
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    webPreferences: {
      preload: join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  // Simple HTML content for splash with minimalist black & white theme
  const splashHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          background: #000; /* solid black */
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #fff; /* white text */
          font-family: system-ui, sans-serif;
        }
        .container {
          text-align: center;
          padding: 32px;
          background: #111; /* slightly lighter black */
          border-radius: 16px;
          border: 1px solid #222; /* subtle border */
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }
        h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }
        .loading {
          font-size: 14px;
          color: #aaa;
          animation: pulse 1.8s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Loading...</h2>
        <div class="loading">Please wait</div>
      </div>
    </body>
    </html>
  `

  splash.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(splashHtml)}`)

}

function createWindow() {
  // Create main window
  win = new BrowserWindow({
    icon: join(process.env.VITE_PUBLIC as string, 'electron-vite.svg'),
    webPreferences: {
      preload: join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true
    },
    width: 1200,
    height: 800,
    show: false, // Don't show immediately
  })

  // // Hide the menu bar (can still be toggled with Alt on Windows)
  // win.setMenuBarVisibility(false)

  // // Fully disable the menu (Alt key won't bring it back)
  // Menu.setApplicationMenu(null)

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    const indexPath = join(RENDERER_DIST, 'index.html')
    win.loadFile(indexPath)
  }

  // when main window is ready, close splash
  win.once('ready-to-show', () => {
    if (splash) {
      splash.close()
      splash = null
    }
    win?.show()
    win?.focus()
  })
  
}

// Handle any unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(async () => {  
  try {
  createSplash()

  // Now start main app (database initialization will be performed after login)
  createWindow()
    
    // ======== IPCs ============
    loginIpc()
    dashboardIpc()
    // ============================
    
    // Try importing and calling loginIpc after everything is set up
    try {
      const { loginIpc } = await import('./IPC/login-IPC')
      loginIpc()
    } catch (ipcError) {
      console.error('Error initializing IPC:', ipcError)
    }
    
  } catch (error) {
    console.error('Error in app.whenReady:', error)
  }
})