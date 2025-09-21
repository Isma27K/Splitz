import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./index.css";

// ========= Page =========
import LoginPage from "./app/Login/Login.page.tsx";
import WelcomePage from "./app/firstSetup/welcomePage.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx"; // PascalCase
//========================

declare global {
    interface Window {
        auth: {
            isFirstTime: () => Promise<boolean>;
        };
    }
}


function App() {
    const [loading, setLoading] = useState(true);
    const [firstTime, setFirstTime] = useState(false);

    useEffect(() => {
        const checkFirstTime = async () => {
            const result = await window.auth.isFirstTime();
            setFirstTime(result);
            setLoading(false);
        };
        checkFirstTime();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <HashRouter>
            <Routes>
                {firstTime ? (
                    <Route path="/" Component={WelcomePage} />
                ) : (
                    <Route path="/" Component={LoginPage} />
                )}
            </Routes>
        </HashRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
