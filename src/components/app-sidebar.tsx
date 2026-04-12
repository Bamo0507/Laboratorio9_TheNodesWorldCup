"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Network,
  Atom,
  GitGraph,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    id: "neodash",
    label: "NeoDash",
    href: "/neodash",
    icon: LayoutDashboard,
    badge: "Low-Code",
    color: "text-blue-400",
  },
  {
    id: "cytoscapejs",
    label: "Cytoscape.js",
    href: "/cytoscapejs",
    icon: Network,
    badge: "JS Library",
    color: "text-emerald-400",
  },
  {
    id: "react-force-graph",
    label: "react-force-graph",
    href: "/react-force-graph",
    icon: Atom,
    badge: "React",
    color: "text-violet-400",
  },
  {
    id: "nvl",
    label: "NVL",
    href: "/nvl",
    icon: GitGraph,
    badge: "Neo4j",
    color: "text-cyan-400",
  },
  {
    id: "extras",
    label: "Extras",
    href: "/extras",
    icon: Sparkles,
    badge: "Más herramientas",
    color: "text-orange-400",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r border-border bg-sidebar z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
          <GitGraph className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none text-foreground font-[family-name:var(--font-fira-code)]">
            The Nodes
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 font-[family-name:var(--font-fira-code)]">
            World Cup
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Herramientas
        </p>
        {tools.map((tool) => {
          const isActive = pathname === tool.href;
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-150 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-primary/30"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? tool.color : "text-muted-foreground group-hover:" + tool.color.split("-")[1] + "-400"
                )}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-medium truncate font-[family-name:var(--font-fira-code)] text-xs",
                    isActive && "text-foreground"
                  )}
                >
                  {tool.label}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {tool.badge}
                </p>
              </div>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Base de Datos 2 · Lab 9
          <br />
          Graph Dashboard Tools
        </p>
      </div>
    </aside>
  );
}
