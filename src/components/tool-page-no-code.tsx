import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResourceLink {
  label: string;
  href: string;
  description?: string;
}

/* ─────────────────────────────────────────────
   ToolPage — para herramientas que no corren en live
   (NeoDash, plataformas, etc.)
   ───────────────────────────────────────────── */
interface ToolPageProps {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  Icon: LucideIcon;
  demo: React.ReactNode;
  resources: ResourceLink[];
}

export function ToolPage({
  name,
  tagline,
  description,
  accentColor,
  Icon,
  demo,
  resources,
}: ToolPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              accentColor
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-fira-code)] text-foreground mb-1">
              {name}
            </h1>
            <p className="text-sm font-medium text-muted-foreground">{tagline}</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-6 space-y-6">
        {/* Demo */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 font-[family-name:var(--font-fira-code)]">
            // Demo
          </h2>
          <div className="rounded-xl border border-border bg-card overflow-hidden min-h-[560px]">
            {demo}
          </div>
        </section>

        <Separator />

        {/* Resources */}
        <ResourcesGrid resources={resources} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LiveToolPage — para librerías open source con
   demo interactivo: split código / render
   ───────────────────────────────────────────── */
export interface DemoSection {
  title: string;
  description?: string;
  render: React.ReactNode;
}

interface LiveToolPageProps {
  name: string;
  tagline: string;
  description: string;
  accentColor: string;
  Icon: LucideIcon;
  demos: DemoSection[];
  resources: ResourceLink[];
}

export function LiveToolPageNoCode({
  name,
  tagline,
  description,
  accentColor,
  Icon,
  demos,
  resources,
}: LiveToolPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              accentColor
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-fira-code)] text-foreground mb-1">
              {name}
            </h1>
            <p className="text-sm font-medium text-muted-foreground">{tagline}</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-8 py-6 space-y-8">
        {/* Demo sections */}
        {demos.map((demo, i) => (
          <section key={i}>
            {/* Section label */}
            <div className="mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground font-[family-name:var(--font-fira-code)]">
                // Demo {demos.length > 1 ? `${i + 1}` : ""} — {demo.title}
              </h2>
              {demo.description && (
                <p className="text-sm text-muted-foreground mt-1">{demo.description}</p>
              )}
            </div>

            {/* Split panel: código | render */}
            <div className="gap-0 rounded-xl border border-border overflow-hidden h-[560px]">
              <div className="flex flex-col min-h-0 bg-card">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40 shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary/60" />
                  <span className="text-[10px] text-muted-foreground font-[family-name:var(--font-fira-code)]">
                    resultado
                  </span>
                </div>
                <div className="flex-1 overflow-hidden min-h-0">
                  {demo.render}
                </div>
              </div>
            </div>

            {i < demos.length - 1 && <Separator className="mt-8" />}
          </section>
        ))}

        <Separator />

        {/* Resources */}
        <ResourcesGrid resources={resources} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared: grid de recursos
   ───────────────────────────────────────────── */
function ResourcesGrid({ resources }: { resources: ResourceLink[] }) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 font-[family-name:var(--font-fira-code)]">
        // Recursos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {resources.map((r) => (
          <a
            key={r.href}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="h-full transition-all duration-150 hover:border-primary/50 cursor-pointer">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-medium font-[family-name:var(--font-fira-code)] flex items-center justify-between gap-2">
                  {r.label}
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </CardTitle>
              </CardHeader>
              {r.description && (
                <CardContent className="px-4 pb-4 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {r.description}
                  </p>
                </CardContent>
              )}
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Placeholder para demos pendientes
   ───────────────────────────────────────────── */
export function DemoPlaceholder({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[560px] text-center px-8 gap-3">
      <div className="h-16 w-16 rounded-full border-2 border-dashed border-border flex items-center justify-center">
        <span className="text-2xl">⬡</span>
      </div>
      <p className="text-sm font-medium text-muted-foreground font-[family-name:var(--font-fira-code)]">
        {message ?? "// demo pendiente de implementar"}
      </p>
    </div>
  );
}
