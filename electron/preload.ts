import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("electron", {
  sendLogin: (email: string, password: string) => ipcRenderer.send("login", { email, password }),
})

contextBridge.exposeInMainWorld("auth", {
  isFirstTime: async (): Promise<boolean> => {
    return await ipcRenderer.invoke("isFirstTime");
  },
})