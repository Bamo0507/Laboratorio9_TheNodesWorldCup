"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const elementos = {
  nodes: [
    { data: { id: "guatemala", label: "Guatemala", tipo: "Equipo" } },
    { data: { id: "mexico", label: "México", tipo: "Equipo" } },
    { data: { id: "brasil", label: "Brasil", tipo: "Equipo" } },
    { data: { id: "argentina", label: "Argentina", tipo: "Equipo" } },
    { data: { id: "alemania", label: "Alemania", tipo: "Equipo" } },
  ],
  edges: [
    { data: { source: "guatemala", target: "mexico", rel: "JUEGA_CON" } },
    { data: { source: "mexico", target: "argentina", rel: "COMPARTE_GRUPO" } },
    { data: { source: "brasil", target: "argentina", rel: "COMPITE_CON" } },
    { data: { source: "alemania", target: "brasil", rel: "JUEGA_CON" } },
    { data: { source: "guatemala", target: "alemania", rel: "COMPARTE_GRUPO" } },
    { data: { source: "argentina", target: "alemania", rel: "COMPITE_CON" } },
  ],
};

export function GrafoEquipos() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cy = cytoscape({
      container: ref.current,
      elements: elementos,
      style: [
        {
          selector: "node[tipo='Equipo']",
          style: {
            "background-color": "#BDA6CE",
            label: "data(label)",
            color: "#ffffff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "10px",
            "font-weight": "bold",
            width: 58,
            height: 58,
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#94a3b8",
            "target-arrow-color": "#94a3b8",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(rel)",
            "font-size": "8px",
            "text-background-color": "#f8fafc",
            "text-background-opacity": 1,
            "text-background-padding": "2px",
            color: "#64748b",
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-width": 3,
            "border-color": "#ffffff",
            "border-opacity": 0.9,
          },
        },
        {
          selector: "edge:selected",
          style: {
            "line-color": "#10b981",
            "target-arrow-color": "#10b981",
            width: 3,
          },
        },
      ],
      layout: {
        name: "circle",
        padding: 30,
        animate: false,
      },
    });

    return () => cy.destroy();
  }, []);

  return <div ref={ref} className="w-full h-full min-h-[356px]" />;
}