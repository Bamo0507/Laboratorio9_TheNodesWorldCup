"use client";

import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const elementos = {
  nodes: [
    { data: { id: "alice", label: "Alice", tipo: "Persona" } },
    { data: { id: "bob", label: "Bob", tipo: "Persona" } },
    { data: { id: "carol", label: "Carol", tipo: "Persona" } },
    { data: { id: "dave", label: "Dave", tipo: "Persona" } },
    { data: { id: "neo4j", label: "Neo4j", tipo: "Empresa" } },
  ],
  edges: [
    { data: { source: "alice", target: "bob", rel: "CONOCE" } },
    { data: { source: "alice", target: "carol", rel: "TRABAJA_CON" } },
    { data: { source: "bob", target: "neo4j", rel: "TRABAJA_EN" } },
    { data: { source: "carol", target: "neo4j", rel: "TRABAJA_EN" } },
    { data: { source: "dave", target: "alice", rel: "REPORTA_A" } },
    { data: { source: "bob", target: "carol", rel: "CONOCE" } },
  ],
};

export function GrafoBasico() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const cy = cytoscape({
      container: ref.current,
      elements: elementos,
      style: [
        {
          selector: "node[tipo='Persona']",
          style: {
            "background-color": "#3b82f6",
            label: "data(label)",
            color: "#fff",
            "text-valign": "center",
            "font-size": "10px",
            "font-weight": "bold",
            width: 52,
            height: 52,
          },
        },
        {
          selector: "node[tipo='Empresa']",
          style: {
            "background-color": "#f97316",
            label: "data(label)",
            color: "#fff",
            "text-valign": "center",
            "font-size": "10px",
            "font-weight": "bold",
            shape: "round-rectangle",
            width: 70,
            height: 40,
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
            "border-color": "#fff",
            "border-opacity": 0.8,
          },
        },
        {
          selector: "edge:selected",
          style: {
            "line-color": "#3b82f6",
            "target-arrow-color": "#3b82f6",
            width: 3,
          },
        },
      ],
      layout: { name: "cose", padding: 40, animate: false },
    });

    return () => cy.destroy();
  }, []);

  return <div ref={ref} className="w-full h-full min-h-[356px]" />;
}
