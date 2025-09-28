"use client"

import { type LucideIcon, MoreHorizontal, Folder } from "lucide-react"
import { useDashboard } from "../app/dashboard/dashboard.page"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { setActiveComponent, activeComponent } = useDashboard()

  const handleProjectClick = (project: { name: string; url: string }) => {
    setActiveComponent(project.name)
    // setBreadcrumbTitle(`Projects - ${project.name}`)
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton 
              onClick={() => handleProjectClick(item)}
              isActive={activeComponent === item.name}
            >
              <item.icon />
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              {/*Dropdown menu*/}
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side="bottom"
                align="end"
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>


            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {/*<SidebarMenuItem>*/}
        {/*  <SidebarMenuButton className="text-sidebar-foreground/70">*/}
        {/*    <MoreHorizontal className="text-sidebar-foreground/70" />*/}
        {/*    <span>More</span>*/}
        {/*  </SidebarMenuButton>*/}
        {/*</SidebarMenuItem>*/}
      </SidebarMenu>
    </SidebarGroup>
  )
}
