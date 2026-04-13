"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const elementos = {
  nodes: [
    { data: { id: "grupo-a", label: "Grupo A", tipo: "Grupo" } },
    { data: { id: "grupo-b", label: "Grupo B", tipo: "Grupo" } },

    { data: { id: "guatemala", label: "Guatemala", tipo: "Equipo" } },
    { data: { id: "mexico", label: "México", tipo: "Equipo" } },
    { data: { id: "brasil", label: "Brasil", tipo: "Equipo" } },
    { data: { id: "alemania", label: "Alemania", tipo: "Equipo" } },
  ],
  edges: [
    { data: { source: "guatemala", target: "grupo-a", rel: "PERTENECE_A" } },
    { data: { source: "mexico", target: "grupo-a", rel: "PERTENECE_A" } },
    { data: { source: "brasil", target: "grupo-b", rel: "PERTENECE_A" } },
    { data: { source: "alemania", target: "grupo-b", rel: "PERTENECE_A" } },
    { data: { source: "grupo-a", target: "grupo-b", rel: "CLASIFICA_A" } },
  ],
};

export function GrafoGrupos() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cy = cytoscape({
      container: ref.current,
      elements: elementos,
      style: [
        {
          selector: "node[tipo='Grupo']",
          style: {
            "background-color": "#87BAC3",
            label: "data(label)",
            color: "#ffffff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "11px",
            "font-weight": "bold",
            shape: "round-rectangle",
            width: 88,
            height: 42,
          },
        },
        {
          selector: "node[tipo='Equipo']",
          style: {
            "background-color": "#BFE9DE",
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
            "line-color": "#87BAC3",
            "target-arrow-color": "#87BAC3",
            width: 3,
          },
        },
      ],
      layout: {
        name: "concentric",
        padding: 30,
        animate: false,
        concentric: (node) => (node.data("tipo") === "Grupo" ? 2 : 1),
        levelWidth: () => 1,
      },
    });

    return () => cy.destroy();
  }, []);

  return <div ref={ref} className="w-full h-full min-h-[356px]" />;
}