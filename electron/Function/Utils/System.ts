import { Notification, BrowserWindow } from "electron";

export function showNotification(title: string, body: string, win?: BrowserWindow) {
  const notification = new Notification({ title, body });

  // Set up event listeners BEFORE showing the notification
  notification.on('click', () => {
    console.log('Notification clicked!');
    
    if (win) {
      // Show the window if it's hidden
      if (!win.isVisible()) {
        win.show();
      }
      
      // Bring window to front and focus
      win.focus();
      
      // On macOS, also restore from dock if minimized
      if (process.platform === 'darwin') {
        win.restore();
      }
    }
  });

  // Show the notification after setting up listeners
  notification.show();
}

