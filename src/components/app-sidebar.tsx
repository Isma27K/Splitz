import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { Link } from "react-router-dom"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import splitzIcon from "@/assets/splitz.ico";

const data = {
  user: {
    name: "isma",
    email: "84092890adl",
    avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/anime_spirited_away_no_face_nobody-512.png",
  },
  navMain: [
    {
      title: "Playground",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "/dashboard",
        },
        {
          title: "Starred",
          url: "/dashboard",
        },
        {
          title: "Settings",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Models",
      url: "/dashboard",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "/dashboard",
        },
        {
          title: "Explorer",
          url: "/dashboard",
        },
        {
          title: "Quantum",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/dashboard",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/dashboard",
        },
        {
          title: "Get Started",
          url: "/dashboard",
        },
        {
          title: "Tutorials",
          url: "/dashboard",
        },
        {
          title: "Changelog",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard",
        },
        {
          title: "Team",
          url: "/dashboard",
        },
        {
          title: "Billing",
          url: "/dashboard",
        },
        {
          title: "Limits",
          url: "/dashboard",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/dashboard",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/dashboard",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/dashboard",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "/dashboard",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src={splitzIcon} alt="app icon" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Splitz</span>
                  <span className="truncate text-xs">alpha</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
