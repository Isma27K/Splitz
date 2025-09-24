import { app, BrowserWindow } from 'electron'
// import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path';
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===== import ipc ========
import {registerAuthHandlers} from "./ipc/auth/auth.js";
import {registerIsFirstTimeHandler} from "./ipc/auth/firstLogin.js";
// ======= end ipc =========

// ===== import database ========
import { AppDataSource } from "./database/db.js";
// ======= end database =========


// const require = createRequire(import.meta.url)
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST
const isDev = process.env.NODE_ENV === "development"


let win: BrowserWindow | null


function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.APP_ROOT, 'build', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    width: 1400,
    height: 850,
  })

  // Disable menu
  win.setMenu(null)

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    console.log('Renderer finished loading');
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  // Listen for renderer process crashes
  win.webContents.on('render-process-gone', (_event, details) => {
    console.error('Renderer process crashed:', details);
  });

  // Listen for unresponsive renderer
  win.on('unresponsive', () => {
    console.error('Renderer process became unresponsive');
  });

  // Listen for console messages from renderer
  win.webContents.on('console-message', (_event, level, message, _line, _sourceId) => {
    console.log(`Renderer console [${level}]:`, message);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // // Only enable DevTools in development
  // if (!app.isPackaged) {
  //   win.webContents.openDevTools(); // optional auto-open
  // }

  // Listen for F12
  win.webContents.on("before-input-event", (_event, input) => {
    if (input.key === "F12" && input.type === "keyDown" && !app.isPackaged) {
      if (!app.isPackaged) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (win.webContents.isDevToolsOpened()) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          win.webContents.closeDevTools();
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          win.webContents.openDevTools();
        }
      }
    }
  });
}

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
  // Initialize database first
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();


      if (!isDev) {
        await AppDataSource.runMigrations()
      }

      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
  }

  createWindow()

  // ======= register IPC here =============
  registerAuthHandlers()
  registerIsFirstTimeHandler()
})
