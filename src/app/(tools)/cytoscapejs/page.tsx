import fs from "fs";
import path from "path";
import { Network } from "lucide-react";
import { LiveToolPage } from "@/components/tool-page";
import { CodeBlock } from "@/components/code-block";
import { GrafoBasico } from "@/features/cytoscapejs/grafo-basico";

export default function CytoscapeJsPage() {
  const codigoGrafoBasico = fs.readFileSync(
    path.join(process.cwd(), "src/features/cytoscapejs/grafo-basico.tsx"),
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
      ]}
      resources={[]}
    />
  );
}
