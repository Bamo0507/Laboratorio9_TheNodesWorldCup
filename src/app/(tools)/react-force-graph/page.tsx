import { Atom } from "lucide-react";
import { LiveToolPage } from "@/components/tool-page";

export default function ReactForceGraphPage() {
  return (
    <LiveToolPage
      name="react-force-graph"
      tagline="Force-Directed Graph Visualization for React"
      description="Librería React para visualización de grafos con simulación de fuerzas físicas. Soporta renderizado 2D y 3D con WebGL, ideal para grafos grandes con interactividad fluida."
      accentColor="bg-violet-500/10 border-violet-500/30 text-violet-600"
      Icon={Atom}
      demos={[
        // Agregar demos aquí — cada uno con: title, description, code, render
      ]}
      resources={[
        // Agregar recursos aquí — cada uno con: label, href, description
      ]}
    />
  );
}
