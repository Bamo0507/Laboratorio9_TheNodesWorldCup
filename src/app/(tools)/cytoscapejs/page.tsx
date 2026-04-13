import fs from "fs";
import path from "path";
import { Network } from "lucide-react";
import { LiveToolPage } from "@/components/tool-page";
import { CodeBlock } from "@/components/code-block";
import { GrafoBasico } from "@/features/cytoscapejs/grafo-basico";
import { GrafoEquipos } from "@/features/cytoscapejs/grafo-equipos";
import { GrafoJerarquico } from "@/features/cytoscapejs/grafo-jerarquico";
import { GrafoGrupos } from "@/features/cytoscapejs/grafo-grupos";

export default function CytoscapeJsPage() {
  const codigoGrafoBasico = fs.readFileSync(
    path.join(process.cwd(), "src/features/cytoscapejs/grafo-basico.tsx"),
    "utf-8"
  );

  const codigoGrafoEquipos = fs.readFileSync(
    path.join(process.cwd(), "src/features/cytoscapejs/grafo-equipos.tsx"),
    "utf-8"
  );

  const codigoGrafoJerarquico = fs.readFileSync(
    path.join(process.cwd(), "src/features/cytoscapejs/grafo-jerarquico.tsx"),
    "utf-8"
  );

  const codigoGrafoGrupos = fs.readFileSync(
    path.join(process.cwd(), "src/features/cytoscapejs/grafo-grupos.tsx"),
    "utf-8"
  );

  return (
    <LiveToolPage
      name="Cytoscape.js"
      tagline="Graph Theory Library for the Web"
      description="Librería JavaScript open source para visualización y análisis de grafos en el browser. Soporta layouts avanzados, styling declarativo, eventos interactivos y es altamente extensible mediante plugins."
      accentColor="bg-emerald-500/10 border-emerald-500/30 text-emerald-600"
      Icon={Network}
      demos={[
        {
          title: "Grafo con nodos y relaciones etiquetadas",
          description:
            "Grafo dirigido con dos tipos de nodo (Persona y Empresa) y relaciones con etiqueta. Layout cose para posicionamiento automático.",
          codeBlock: <CodeBlock code={codigoGrafoBasico} lang="tsx" />,
          render: <GrafoBasico />,
        },
        {
          title: "Grafo de equipos y rivalidades",
          description:
            "Ejemplo con selecciones conectadas por relaciones como JUEGA_CON, COMPARTE_GRUPO y COMPITE_CON. Usa layout circular para mostrar mejor la red.",
          codeBlock: <CodeBlock code={codigoGrafoEquipos} lang="tsx" />,
          render: <GrafoEquipos />,
        },
        {
          title: "Grafo jerárquico de roles en un equipo",
          description:
            "Ejemplo de estructura jerárquica con roles dentro de un equipo. Usa layout breadthfirst para organizar nodos por niveles.",
          codeBlock: <CodeBlock code={codigoGrafoJerarquico} lang="tsx" />,
          render: <GrafoJerarquico />,
        },
        {
          title: "Grafo de grupos del mundial",
          description:
            "Ejemplo con nodos de tipo Grupo y Equipo para representar pertenencia y clasificación. Se utiliza layout grid para una distribución ordenada.",
          codeBlock: <CodeBlock code={codigoGrafoGrupos} lang="tsx" />,
          render: <GrafoGrupos />,
        },
      ]}
      resources={[
        {
          label: "Documentación Oficial",
          href: "https://js.cytoscape.org/#introduction",
          description: "Guía completa de uso"
        }
      ]}
    />
  );
}
