import { GitGraph } from "lucide-react";
import { LiveToolPage } from "@/components/tool-page";

export default function NvlPage() {
  return (
    <LiveToolPage
      name="NVL"
      tagline="Neo4j Visualization Library"
      description="Librería oficial de Neo4j para React, escrita en TypeScript. Optimizada para grafos grandes con soporte nativo para el modelo de datos de Neo4j: nodos, relaciones y propiedades."
      accentColor="bg-cyan-500/10 border-cyan-500/30 text-cyan-600"
      Icon={GitGraph}
      demos={[
        // Agregar demos aquí — cada uno con: title, description, code, render
      ]}
      resources={[
        // Agregar recursos aquí — cada uno con: label, href, description
      ]}
    />
  );
}
