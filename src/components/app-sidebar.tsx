"use client"

import * as React from "react"
import {
  BarChart3,
  FileText,
  Search,
  Swords,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items grouped by function
const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],
  intelligence: [
    {
      title: "Keyword Research",
      url: "/dashboard/keywords",
      icon: Search,
    },
    {
      title: "Site Auditor",
      url: "/dashboard/audit",
      icon: ShieldCheck,
    },
    {
      title: "Competitor War Room",
      url: "/dashboard/competitors",
      icon: Swords,
    },
  ],
  content: [
    {
      title: "AI Writer",
      url: "/dashboard/writer",
      icon: FileText,
    },
    {
      title: "Rank Predictor",
      url: "/dashboard/predict",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-800 bg-black" {...props}>
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-zinc-800">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
          NEXUS SEO
        </span>
      </SidebarHeader>
      
      <SidebarContent className="bg-black">
        {/* General Section */}
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Intelligence Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500">Intelligence</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.intelligence.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500">Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.content.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}