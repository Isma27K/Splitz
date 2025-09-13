import { BrowserWindow, ipcMain } from 'electron';
import { showNotification } from '../Function/Utils/System';
import { addUser } from '../Function/Utils/db';
import { getDatabase } from '../Function/Utils/DB/initialize';

export async function loginIpc() {
    ipcMain.removeHandler('login-request'); // clear old handler

    // Create or get the BrowserWindow instance
    const win = BrowserWindow.getAllWindows()[0] || new BrowserWindow();

    // Example: push a message after renderer finishes loading
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString());
    });

    ipcMain.on('notify', (_event, { title, body }) => {
        showNotification(title, body, win);
    });

    // Use handle so renderer can call via ipcRenderer.invoke and receive a return value
    ipcMain.removeHandler('first-run');
    // Return true when the database exists (i.e. not first run).
    // Renderer will navigate to dashboard when this is true.
    ipcMain.handle('first-run', () => {
        return getDatabase();
    });

    ipcMain.handle("login-request", async (_event, credentials) => {
        
        try {
            // TODO: Call your backend API here
            // Example with fetch:
            /*
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            return data;
            */

            console.log("Received credentials:", credentials);

            // Simulated response
            if (credentials.email === "binhelati@gmail.com" && credentials.password === "smktarat") {

                // const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
                // stmt.run("test@example.com", "123456");

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
