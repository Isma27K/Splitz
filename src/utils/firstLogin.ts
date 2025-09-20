

export function isFirstTime() {
    return !localStorage.getItem("appSetupDone");
}

export function markSetupDone() {
    localStorage.setItem("appSetupDone", "true");
}


