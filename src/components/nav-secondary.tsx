import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { useDashboard } from "../app/dashboard/dashboard.page"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { setActiveComponent, setBreadcrumbTitle, activeComponent } = useDashboard()

  const handleItemClick = (item: { title: string; url: string }) => {
    const componentKey = item.title.toLowerCase()
    setActiveComponent(componentKey)
    setBreadcrumbTitle(item.title)
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                size="sm"
                onClick={() => handleItemClick(item)}
                isActive={activeComponent === item.title.toLowerCase()}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
