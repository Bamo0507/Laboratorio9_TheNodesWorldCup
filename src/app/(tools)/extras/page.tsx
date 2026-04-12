import {
  LayoutDashboard,
  Globe,
  Search,
  BarChart2,
  BarChartHorizontal,
  ExternalLink,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ShadcnChartDemo } from "@/features/extras/shadcn-chart-demo";
import fs from "fs";
import path from "path";
import { CodeBlock } from "@/components/code-block";

/* ─── Tipos ─────────────────────────────────────────────────────── */
interface Feature {
  text: string;
}

interface ResourceLink {
  label: string;
  href: string;
}

interface ToolCard {
  name: string;
  tagline: string;
  description: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  Icon: LucideIcon;
  features: Feature[];
  resources: ResourceLink[];
}

/* ─── Datos ──────────────────────────────────────────────────────── */
const herramientas: ToolCard[] = [
  {
    name: "Neo4j Aura Dashboards",
    tagline: "La evolución oficial de NeoDash",
    description:
      "Integrado directamente en la consola de Neo4j Aura, Aura Dashboards es el sucesor comercial de NeoDash. Ofrece la misma experiencia de construcción de dashboards con Cypher, pero gestionado como servicio dentro de la plataforma cloud de Neo4j — sin necesidad de deployment propio.",
    badge: "Neo4j Oficial",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    accentColor: "bg-blue-500/10 border-blue-500/30 text-blue-600",
    Icon: LayoutDashboard,
    features: [
      { text: "Integrado en Neo4j Aura — sin setup adicional" },
      { text: "Mismos tipos de widget que NeoDash (grafo, tabla, charts, mapas)" },
      { text: "Compartir dashboards con otros usuarios del workspace" },
      { text: "Acceso controlado por roles de Aura" },
      { text: "Sin soporte para iframe (a diferencia de NeoDash standalone)" },
    ],
    resources: [
      { label: "Neo4j Aura Console", href: "https://console.neo4j.io" },
      { label: "Documentación Aura Dashboards", href: "https://neo4j.com/docs/aura/aurads/" },
    ],
  },
  {
    name: "Graphileon",
    tagline: "Graph-Driven Application Builder",
    description:
      "Plataforma para construir aplicaciones operativas encima de una base de datos de grafos. Los nodos son entidades reales — personas, empresas, transacciones — y a cada uno se le pueden asignar acciones: seleccionás el nodo 'Mario', aparece un botón 'Enviar promoción' y eso dispara un query Cypher, llama a una API o escribe un nuevo nodo en el grafo. A diferencia de NeoDash, que sirve para observar datos, Graphileon sirve para operar sobre ellos: tomar decisiones y ejecutar acciones directamente desde la visualización.",
    badge: "Comercial",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    accentColor: "bg-orange-500/10 border-orange-500/30 text-orange-600",
    Icon: Globe,
    features: [
      { text: "Acciones asignables a nodos: click en 'Cliente X' puede enviar un correo, llamar una API o escribir en el grafo" },
      { text: "Orientado a operar sobre datos, no solo a visualizarlos" },
      { text: "Soporte multi-base de datos: Neo4j, Amazon Neptune, ArangoDB" },
      { text: "Constructor visual de aplicaciones — sin código frontend" },
      { text: "API REST para integraciones externas" },
    ],
    resources: [
      { label: "graphileon.com", href: "https://graphileon.com" },
      { label: "Documentación", href: "https://docs.graphileon.com" },
    ],
  },
  {
    name: "Linkurious",
    tagline: "Graph Intelligence for Investigations",
    description:
      "Plataforma comercial enfocada en análisis de grafos para casos de uso como detección de fraude, ciberseguridad e investigaciones. Muy utilizada en sectores financieros y gobierno. Permite explorar grafos complejos con herramientas de búsqueda y visualización avanzada.",
    badge: "Comercial",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    accentColor: "bg-orange-500/10 border-orange-500/30 text-orange-600",
    Icon: Search,
    features: [
      { text: "Exploración visual de grafos a gran escala" },
      { text: "Casos de uso: fraude financiero, AML, ciberseguridad" },
      { text: "Integración nativa con Neo4j, Amazon Neptune y otros" },
      { text: "Alertas y detección de patrones automatizada" },
      { text: "Control de acceso granular por equipo e investigación" },
    ],
    resources: [
      { label: "linkurious.com", href: "https://linkurious.com" },
      { label: "Casos de uso", href: "https://linkurious.com/use-cases/" },
    ],
  },
];

/* ─── Componente tarjeta ─────────────────────────────────────────── */
function HerramientaCard({ tool }: { tool: ToolCard }) {
  const Icon = tool.Icon;
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
              tool.accentColor
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-sm font-semibold font-[family-name:var(--font-fira-code)]">
                {tool.name}
              </CardTitle>
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
                  tool.badgeColor
                )}
              >
                {tool.badge}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{tool.tagline}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {tool.description}
        </p>

        <ul className="space-y-1.5">
          {tool.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
              {f.text}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-3 border-t border-border flex flex-wrap gap-2">
          {tool.resources.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-[family-name:var(--font-fira-code)]"
            >
              {r.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Página ─────────────────────────────────────────────────────── */
export default function ExtrasPage() {
  const codigoChart = fs.readFileSync(
    path.join(process.cwd(), "src/features/extras/shadcn-chart-demo.tsx"),
    "utf-8"
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-orange-500/10 border-orange-500/30 text-orange-600">
            <BarChartHorizontal className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-fira-code)] text-foreground mb-1">
              Extras
            </h1>
            <p className="text-sm font-medium text-muted-foreground">
              Más allá del laboratorio
            </p>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Otras herramientas del ecosistema de visualización de grafos y dashboards: la
              versión comercial de NeoDash, plataformas enterprise y una alternativa open
              source basada en componentes React.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-6 space-y-8">
        {/* Grid de herramientas */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 font-[family-name:var(--font-fira-code)]">
            // Herramientas del ecosistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {herramientas.map((tool) => (
              <HerramientaCard key={tool.name} tool={tool} />
            ))}
          </div>
        </section>

        <Separator />

        {/* shadcn/ui charts — demo en vivo */}
        <section>
          <div className="mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground font-[family-name:var(--font-fira-code)]">
              // shadcn/ui Charts — Open Source
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Componentes de gráficos construidos sobre{" "}
              <a
                href="https://recharts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Recharts
              </a>
              , integrados en el sistema de diseño de shadcn/ui. Ideal para dashboards
              custom dentro de aplicaciones React sin depender de herramientas externas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-0 rounded-xl border border-border overflow-hidden h-[480px]">
            {/* Código */}
            <div className="flex flex-col min-h-0 border-r border-border bg-[#282c34]">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-white/4 shrink-0">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <span className="text-[10px] text-white/30 font-[family-name:var(--font-fira-code)] ml-1">
                  shadcn-chart-demo.tsx
                </span>
              </div>
              <div className="flex-1 overflow-y-auto min-h-0">
                <CodeBlock code={codigoChart} lang="tsx" />
              </div>
            </div>

            {/* Render */}
            <div className="flex flex-col min-h-0 bg-card">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40 shrink-0">
                <div className="h-2 w-2 rounded-full bg-primary/60" />
                <span className="text-[10px] text-muted-foreground font-[family-name:var(--font-fira-code)]">
                  resultado
                </span>
              </div>
              <div className="flex-1 overflow-hidden min-h-0">
                <ShadcnChartDemo />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <a
              href="https://ui.shadcn.com/charts/area"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline font-[family-name:var(--font-fira-code)]"
            >
              ui.shadcn.com/charts/area
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-[11px] text-muted-foreground">— Documentación y ejemplos de todos los tipos de chart</span>
          </div>
        </section>
      </div>
    </div>
  );
}
