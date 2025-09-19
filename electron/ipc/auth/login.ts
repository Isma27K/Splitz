import { ipcMain } from "electron"

export function registerAuthHandlers() {
    ipcMain.on("login", (_event, { email, password }) => {
        console.log("[AUTH] Login received:", email, password)
        // TODO: verify user
    })

    ipcMain.on("logout", () => {
        console.log("[AUTH] Logout request")
    })
}
