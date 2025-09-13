import { Notification, app, ipcMain, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
function showNotification(title, body, win2) {
  const notification = new Notification({ title, body });
  notification.on("click", () => {
    console.log("Notification clicked!");
    if (win2) {
      if (!win2.isVisible()) {
        win2.show();
      }
      win2.focus();
      if (process.platform === "darwin") {
        win2.restore();
      }
    }
  });
  notification.show();
}
let db;
function initDatabase() {
  if (db) return db;
  const dbPath = path.join(app.getPath("userData"), "app.db");
  db = new Database(dbPath);
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `).run();
  return db;
}
function getDatabase() {
  const dbPath = path.join(app.getPath("userData"), "app.db");
  return fs.existsSync(dbPath);
}
function getDb() {
  return initDatabase();
}
function addUser(name) {
  const db2 = getDb();
  const stmt = db2.prepare("INSERT INTO users (name) VALUES (?)");
  const info = stmt.run(name);
  return info.lastInsertRowid;
}
async function loginIpc() {
  ipcMain.removeHandler("login-request");
  const win2 = BrowserWindow.getAllWindows()[0] || new BrowserWindow();
  win2.webContents.on("did-finish-load", () => {
    win2 == null ? void 0 : win2.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  ipcMain.on("notify", (_event, { title, body }) => {
    showNotification(title, body, win2);
  });
  ipcMain.removeHandler("first-run");
  ipcMain.handle("first-run", () => {
    return getDatabase();
  });
  ipcMain.handle("login-request", async (_event, credentials) => {
    try {
      console.log("Received credentials:", credentials);
      if (credentials.email === "binhelati@gmail.com" && credentials.password === "smktarat") {
        addUser("Test User");
        return { success: true, token: "abc123" };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      console.error("Backend error:", error);
      return { success: false, message: "Server error" };
    }
  });
}
const loginIPC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loginIpc
}, Symbol.toStringTag, { value: "Module" }));
async function dashboardIpc() {
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
globalThis.__filename = __filename;
globalThis.__dirname = __dirname;
process.env.APP_ROOT = join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let splash;
let win;
function createSplash() {
  splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    // no title bar
    transparent: true,
    // nice overlay look
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    webPreferences: {
      preload: join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
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
  `;
  splash.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(splashHtml)}`);
}
function createWindow() {
  win = new BrowserWindow({
    icon: join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    },
    width: 1200,
    height: 800,
    show: false
    // Don't show immediately
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    const indexPath = join(RENDERER_DIST, "index.html");
    win.loadFile(indexPath);
  }
  win.once("ready-to-show", () => {
    if (splash) {
      splash.close();
      splash = null;
    }
    win == null ? void 0 : win.show();
    win == null ? void 0 : win.focus();
  });
}
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled promise rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(async () => {
  try {
    createSplash();
    createWindow();
    loginIpc();
    dashboardIpc();
    try {
      const { loginIpc: loginIpc2 } = await Promise.resolve().then(() => loginIPC);
      loginIpc2();
    } catch (ipcError) {
      console.error("Error initializing IPC:", ipcError);
    }
  } catch (error) {
    console.error("Error in app.whenReady:", error);
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
