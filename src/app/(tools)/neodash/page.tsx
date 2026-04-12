import { LayoutDashboard } from "lucide-react";
import { ToolPage, DemoPlaceholder } from "@/components/tool-page";

export default function NeoDashPage() {
  return (
    <ToolPage
      name="NeoDash"
      tagline="Dashboard Builder for Neo4j"
      description="Herramienta low-code que permite construir dashboards interactivos sobre Neo4j usando queries Cypher. Sin necesidad de escribir frontend: tablas, grafos, mapas, charts y más, configurados visualmente."
      accentColor="bg-blue-500/10 border-blue-500/30 text-blue-400"
      Icon={LayoutDashboard}
      demo={
        <DemoPlaceholder message="// Carrusel de screenshots y video demo — pendiente" />
      }
      resources={[
        {
          label: "neodash.graphapp.io",
          href: "https://neodash.graphapp.io",
          description: "Aplicación web oficial de NeoDash. Conectá tu instancia de Neo4j y construí dashboards.",
        },
        {
          label: "GitHub — neo4j-labs/neodash",
          href: "https://github.com/neo4j-labs/neodash",
          description: "Repositorio oficial open source con el código fuente y documentación técnica.",
        },
        {
          label: "Documentación oficial",
          href: "https://neo4j.com/labs/neodash/",
          description: "Guía completa de uso: tipos de reportes, parámetros, extensiones y deployment.",
        },
        {
          label: "NeoDash 2.4 — Blog post",
          href: "https://neo4j.com/blog/news/neodash-2-4-neo4j-graph-dashboards/",
          description: "Artículo oficial presentando las novedades: grafos 3D, dark mode, formularios y más.",
        },
        {
          label: "Neo4j Console Dashboards",
          href: "https://console.neo4j.io",
          description: "Sucesor comercial de NeoDash integrado en la consola de Neo4j Aura.",
        },
        {
          label: "Neo4j Aura Free",
          href: "https://neo4j.com/cloud/platform/aura-graph-database/",
          description: "Instancia gratuita de Neo4j en la nube para conectar con NeoDash sin infraestructura local.",
        },
      ]}
    />
  );
}
