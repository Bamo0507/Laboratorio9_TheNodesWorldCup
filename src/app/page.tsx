import Link from "next/link";
import { LayoutDashboard, Network, GitGraph } from "lucide-react";

const tools = [
  {
    id: "neodash",
    label: "NeoDash",
    description: "Dashboard builder low-code para Neo4j. Visualizaciones con queries Cypher sin escribir frontend.",
    href: "/neodash",
    icon: LayoutDashboard,
    badge: "Low-Code · Neo4j Labs",
    accent: "border-blue-500/30 hover:border-blue-500/60 group-hover:text-blue-400",
    iconColor: "text-blue-400",
    bg: "group-hover:bg-blue-500/5",
  },
  {
    id: "cytoscapejs",
    label: "Cytoscape.js",
    description: "Librería JS open source para grafos en el browser. Layouts avanzados, styling declarativo y extensible.",
    href: "/cytoscapejs",
    icon: Network,
    badge: "Open Source · MIT",
    accent: "border-emerald-500/30 hover:border-emerald-500/60 group-hover:text-emerald-400",
    iconColor: "text-emerald-400",
    bg: "group-hover:bg-emerald-500/5",
  },
  {
    id: "nvl",
    label: "NVL",
    description: "Neo4j Visualization Library. Librería oficial de Neo4j para React, optimizada para grafos grandes.",
    href: "/nvl",
    icon: GitGraph,
    badge: "Neo4j · TypeScript",
    accent: "border-cyan-500/30 hover:border-cyan-500/60 group-hover:text-cyan-400",
    iconColor: "text-cyan-400",
    bg: "group-hover:bg-cyan-500/5",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-[family-name:var(--font-fira-code)]">
          Base de Datos 2 · Laboratorio 9
        </p>
        <h1 className="text-4xl font-bold font-[family-name:var(--font-fira-code)] text-foreground">
          The Nodes World Cup 🇩🇪
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
          Exploración comparativa de herramientas para visualización y dashboards sobre bases de datos de grafos.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          const isLast = i === tools.length - 1;
          const isOdd = tools.length % 2 !== 0;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className={`group${isLast && isOdd ? " col-span-full mx-auto w-full max-w-[calc(50%-8px)]" : ""}`}
            >
              <div
                className={`relative flex flex-col gap-3 rounded-xl border bg-card p-6 transition-all duration-200 cursor-pointer ${tool.accent} ${tool.bg}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 shrink-0 ${tool.iconColor}`} />
                  <span className={`font-semibold font-[family-name:var(--font-fira-code)] text-sm text-foreground`}>
                    {tool.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>
                <span className="text-[10px] font-medium text-muted-foreground/60 font-[family-name:var(--font-fira-code)]">
                  {tool.badge}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
