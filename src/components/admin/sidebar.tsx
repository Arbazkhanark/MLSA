"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  MessageSquare,
  ImageIcon,
  Bell,
  Shield,
  icons,
} from "lucide-react";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/admin/dashboard",
    badge: null,
  },
  {
    icon: Users,
    label: "Team Management",
    href: "/admin/dashboard/team",
    badge: null,
  },
  {
    icon: Calendar,
    label: "Events",
    href: "/admin/dashboard/events",
    badge: "3",
  },
  {
    icon: FileText,
    label: "Openings",
    href: "/admin/dashboard/openings",
    badge: "5"
  },
  {
    icon: FileText,
    label: "Applications",
    href: "/admin/dashboard/applications",
    badge: "23",
  },
  {
    icon: BarChart3,
    label: "Resources",
    href: "/admin/dashboard/resources",
    badge: null,
  },
  {
    icon: ImageIcon,
    label: "Happy Moments",
    href: "/admin/dashboard/moments",
    badge: null,
  },
  {
    icon: MessageSquare,
    label: "Messages",
    href: "/admin/dashboard/messages",
    badge: "5",
  },
  {
    icon: Bell,
    label: "Announcements",
    href: "/admin/dashboard/announcements",
    badge: null,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/admin/dashboard/settings",
    badge: null,
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div
      className={`bg-card border-r border-border transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">MLSA Admin</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-2 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start h-10 ${
                isCollapsed ? "px-2" : "px-3"
              }`}
              onClick={() => router.push(item.href)}
            >
              <item.icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto h-5 px-1.5 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          className={`w-full justify-start h-10 text-destructive hover:text-destructive hover:bg-destructive/10 ${
            isCollapsed ? "px-2" : "px-3"
          }`}
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
}
