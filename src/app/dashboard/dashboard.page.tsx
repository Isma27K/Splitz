/**
 * dashboard.page.tsx
 * Project: Splitz
 * Author: Isma27K
 * Created: 9/22/2025 11:50 PM
 */

import React, { useState, createContext, useContext } from "react"
import { AppSidebar } from "../../components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { Separator } from "../../components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../components/ui/sidebar"
import { Link } from "react-router-dom"

// Context for managing active component
interface DashboardContextType {
    activeComponent: string
    setActiveComponent: (component: string) => void
    breadcrumbTitle: string
    setBreadcrumbTitle: (title: string) => void
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

const ModelsComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Models Management</span>
        </div>
    </div>
)

const DocumentationComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Documentation</span>
        </div>
    </div>
)

const SettingsComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Settings</span>
        </div>
    </div>
)

const ProjectsComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Projects</span>
        </div>
    </div>
)

const SupportComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Support</span>
        </div>
    </div>
)

const FeedbackComponent = () => (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <span className="text-muted-foreground text-lg">Feedback</span>
        </div>
    </div>
)

// Component mapping
const componentMap: Record<string, React.ComponentType> = {
    'playground': PlaygroundComponent,
    'models': ModelsComponent,
    'documentation': DocumentationComponent,
    'settings': SettingsComponent,
    'projects': ProjectsComponent,
    'support': SupportComponent,
    'feedback': FeedbackComponent,
}

export default function DashboardPage() {
    const [activeComponent, setActiveComponent] = useState('playground')
    const [breadcrumbTitle, setBreadcrumbTitle] = useState('Playground')

    const renderActiveComponent = () => {
        const Component = componentMap[activeComponent]
        return Component ? <Component /> : <PlaygroundComponent />
    }
    return (
        <DashboardContext.Provider value={{ activeComponent, setActiveComponent, breadcrumbTitle, setBreadcrumbTitle }}>
            <SidebarProvider>
                {/*Side bar*/}
                <AppSidebar />

                {/* main content */}
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink asChild>
                                            <Link to="/dashboard">
                                                Dashboard
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    {renderActiveComponent()}
                </SidebarInset>
            </SidebarProvider>
        </DashboardContext.Provider>
    )
}
