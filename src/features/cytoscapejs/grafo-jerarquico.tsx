"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const elementos = {
  nodes: [
    { data: { id: "entrenador", label: "Entrenador", tipo: "Rol", nivel: "entrenador" } },
    { data: { id: "capitan", label: "Capitán", tipo: "Rol", nivel: "capitan" } },
    { data: { id: "portero", label: "Portero", tipo: "Rol", nivel: "jugador" } },
    { data: { id: "defensa", label: "Defensa", tipo: "Rol", nivel: "jugador" } },
    { data: { id: "mediocampo", label: "Mediocampo", tipo: "Rol", nivel: "jugador" } },
    { data: { id: "delantero", label: "Delantero", tipo: "Rol", nivel: "jugador" } },
  ],
  edges: [
    { data: { source: "entrenador", target: "capitan", rel: "DIRIGE_A" } },
    { data: { source: "capitan", target: "portero", rel: "COORDINA_A" } },
    { data: { source: "capitan", target: "defensa", rel: "COORDINA_A" } },
    { data: { source: "capitan", target: "mediocampo", rel: "COORDINA_A" } },
    { data: { source: "capitan", target: "delantero", rel: "COORDINA_A" } },
  ],
};

export function GrafoJerarquico() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cy = cytoscape({
      container: ref.current,
      elements: elementos,
      style: [
        {
          selector: "node[nivel='entrenador']",
          style: {
            "background-color": "#F13E93",
            label: "data(label)",
            color: "#ffffff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "10px",
            "font-weight": "bold",
            shape: "round-rectangle",
            width: 86,
            height: 42,
          },
        },
        {
          selector: "node[nivel='capitan']",
          style: {
            "background-color": "#F891BB",
            label: "data(label)",
            color: "#ffffff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "10px",
            "font-weight": "bold",
            shape: "round-rectangle",
            width: 86,
            height: 42,
          },
        },
        {
          selector: "node[nivel='jugador']",
          style: {
            "background-color": "#FFCEE3",
            label: "data(label)",
            color: "#ffffff",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "10px",
            "font-weight": "bold",
            shape: "round-rectangle",
            width: 86,
            height: 42,
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
            "line-color": "#7c3aed",
            "target-arrow-color": "#7c3aed",
            width: 3,
          },
        },
      ],
      layout: {
        name: "breadthfirst",
        directed: true,
        padding: 30,
        animate: false,
      },
    });

    return () => cy.destroy();
  }, []);

  return <div ref={ref} className="w-full h-full min-h-[356px]" />;
}
