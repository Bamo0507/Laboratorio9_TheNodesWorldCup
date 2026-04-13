"use client";

import { useEffect, useRef } from "react";
import type { Node, Relationship } from "@neo4j-nvl/base";

const nodes: Node[] = [
  { id: "1", caption: "Node 1", color: "#534AB7", size: 44 },
  { id: "2", caption: "Node 2", color: "#0F6E56", size: 44 },
  { id: "3", caption: "Node 3", color: "#993C1D", size: 44 },
];

const relationships: Relationship[] = [
  { id: "r1", from: "1", to: "2", caption: "CONNECTS", color: "#854F0B" },
  { id: "r2", from: "2", to: "3", caption: "RELATES",  color: "#185FA5" },
];

export function GrafoBasico() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let destroyed = false;

    // Dynamic import evita que NVL acceda al DOM durante SSR
    import("@neo4j-nvl/base").then(({ default: NVL }) => {
      if (destroyed) return;
      const nvl = new NVL(el, nodes, relationships, {
        renderer: "canvas",
        layout: "forceDirected",
        disableTelemetry: true,
      });
      el.dataset.nvl = "1"; // marca para el cleanup
      (el as HTMLDivElement & { _nvl?: typeof nvl })._nvl = nvl;
    });

    return () => {
      destroyed = true;
      const nvl = (el as HTMLDivElement & { _nvl?: { destroy(): void } })._nvl;
      nvl?.destroy();
    };
  }, []);

  return <div ref={ref} className="w-full h-full min-h-[356px]" />;
}