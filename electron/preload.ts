import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("electron", {
  sendLogin: (email: string, password: string) => ipcRenderer.send("login", { email, password }),
})

contextBridge.exposeInMainWorld("auth", {
  isFirstTime: async (): Promise<boolean> => {
    return await ipcRenderer.invoke("isFirstTime");
  },
  createUser: async (name: string, email: string, password: string): Promise<{success: boolean, userId?: number, error?: string}> => {
    return await ipcRenderer.invoke("createUser", { name, email, password });
  },
})