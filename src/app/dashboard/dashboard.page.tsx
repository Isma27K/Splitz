/**
 * dashboard.page.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/22/2025 11:50 PM
 */

import React, { useState, createContext, useContext } from "react"
import { AppSidebar } from "../../components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../components/ui/sidebar"

import {Separator} from '../../components/ui/separator.tsx'
import mainDashboard from "@/components/doashboard/mainDashboard.tsx";
import AssetPage from "@/app/asset/asset.page.tsx";

// Context for managing active component
interface DashboardContextType {
    activeComponent: string
    setActiveComponent: (component: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider')
    }
    return context
}

// Content Components
const PlaygroundComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground">Playground View 1</span>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground">Playground View 2</span>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
                <span className="text-muted-foreground">Playground View 3</span>
            </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Playground Main Content</span>
        </div>
    </div>
)


// Component mapping
const componentMap: Record<string, React.ComponentType> = {
    'dashboard': mainDashboard,

    // management
    'Asset': AssetPage
}

export default function DashboardPage() {
    const [activeComponent, setActiveComponent] = useState('dashboard')

    const renderActiveComponent = () => {
        const Component = componentMap[activeComponent]
        return Component ? <Component /> : <PlaygroundComponent />
    }
    return (
        <DashboardContext.Provider value={{ activeComponent, setActiveComponent }}>
            <SidebarProvider>
                {/*Side bar*/}
                <AppSidebar />

                {/* main content */}
                <SidebarInset >
                    <header className="flex h-10 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                    </header>

                    <Separator className="my-1" />

                    {renderActiveComponent()}
                </SidebarInset>
            </SidebarProvider>
        </DashboardContext.Provider>
    )
}
