import fs from "fs";
import path from "path";
import { GitGraph } from "lucide-react";
import { LiveToolPageNoCode } from "@/components/tool-page-no-code";
import { LiveToolPage } from "@/components/tool-page";
import { CodeBlock } from "@/components/code-block";
import { Neo4jSocialGraph } from "@/features/nvl/neo4j-social-graph";
import { GrafoBasico } from "@/features/nvl/neo4j-simple-graph";

export default function NvlPage() {

  const codigoGrafoSimple = fs.readFileSync(
      path.join(process.cwd(), "src/features/nvl/neo4j-simple-graph.tsx"),
      "utf-8"
    );

  return (
    <div className="flex flex-col min-h-screen">
      <LiveToolPage
        name="NVL"
        tagline="Neo4j Visualization Library"
        description="Librería oficial de Neo4j para React, escrita en TypeScript. Optimizada para grafos grandes con soporte nativo para el modelo de datos de Neo4j: nodos, relaciones y propiedades."
        accentColor="bg-cyan-500/10 border-cyan-500/30 text-cyan-600"
        Icon={GitGraph}
        demos={[
                {
                  title: "Grafo desde nodos y relaciones",
                  description:
                    "Grafo dirigido con dos tipos de nodo (Persona y Empresa) y relaciones con etiqueta. Layout cose para posicionamiento automático.",
                  codeBlock: <CodeBlock code={codigoGrafoSimple} lang="tsx" />,
                  render: <GrafoBasico />,
                }
              ]}
      />
      <LiveToolPageNoCode
          name="NVL Advanced"
          tagline="Neo4j Visualization Library"
          description="Librería oficial de Neo4j para React, escrita en TypeScript. Optimizada para grafos grandes con soporte nativo para el modelo de datos de Neo4j: nodos, relaciones y propiedades."
          accentColor="bg-cyan-500/10 border-cyan-500/30 text-cyan-600"
          Icon={GitGraph}
          demos={[
                  {
                    title: "Grafo con nodos y relaciones etiquetadas con tooltip",
                    description:
                      "Grafo dirigido con dos tipos de nodo (Persona y Empresa) y relaciones con etiqueta. Layout cose para posicionamiento automático. Repositorio con codigo de ejemplo avanzado: https://github.com/Bamo0507/Laboratorio9_TheNodesWorldCup/blob/main/src/features/nvl/neo4j-social-graph.tsx",
                    render: <Neo4jSocialGraph />,
                  }
                ]}
          resources={[
            {
              label: "Documentación API Oficial",
              href: "https://neo4j.com/docs/api/nvl",
              description: "Guía completa de uso"
            }
          ]}
        />
    </div>
  );
}
//     
//   );
// }
