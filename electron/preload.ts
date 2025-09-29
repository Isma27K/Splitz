import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld("electron", {
  sendLogin: (email: string, password: string) => ipcRenderer.send("login", { email, password }),
})

contextBridge.exposeInMainWorld("auth", {
  isFirstTime: async (): Promise<boolean> => {
    return await ipcRenderer.invoke("isFirstTime");
  },
  createUser: async (name: string, password: string, income: number, paydate: number): Promise<{success: boolean, userId?: number, error?: string}> => {
    return await ipcRenderer.invoke("createUser", { name, password, income, paydate });
  },
  loginUser: async (username: string, password: string): Promise<boolean> => {
    return await ipcRenderer.invoke("login", { username, password });
  }
})

contextBridge.exposeInMainWorld("account", {
  createAccount: async (name: string, type: string, proportion: number): Promise<boolean> => {
    return await ipcRenderer.invoke("createAccount", { name, type, proportion });
  }
})
