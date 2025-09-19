import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'

import { isFirstTime } from './utils/firstLogin'

// ========= Page =========
import LoginPage from "./app/Login/Login.page.tsx";

import welcomePage from './app/firstSetup/welcome.page.tsx'
//========================


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            {isFirstTime() ? (
                <Route path="/" Component={welcomePage} /> // TODO: should lead us to first time setup
            ): (
                <Route path="/" Component={LoginPage} />
            )}
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)

// // Use contextBridge
// if (window.ipcRenderer) {
//   window.ipcRenderer.on('main-process-message', (_event, message) => {
//     console.log(message)
//   })
// }
