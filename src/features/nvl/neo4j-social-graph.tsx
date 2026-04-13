"use client";

import { useEffect, useRef, useState } from "react";
import type NVLInstance from "@neo4j-nvl/base";
import type { Node, Relationship } from "@neo4j-nvl/base";

// ─── Data ────────────────────────────────────────────────────────────────────

const TYPE_COLORS = { Person: "#534AB7", Movie: "#0F6E56", City: "#993C1D" } as const;
const TYPE_SIZES  = { Person: 44,        Movie: 40,        City: 36        } as const;

type NodeType = keyof typeof TYPE_COLORS;

const NODE_META = [
  { id: "0", label: "Alice",  type: "Person" as NodeType, props: { name: "Alice",       age: 32,   role: "Engineer"  } },
  { id: "1", label: "Bob",    type: "Person" as NodeType, props: { name: "Bob",         age: 28,   role: "Designer"  } },
  { id: "2", label: "Carol",  type: "Person" as NodeType, props: { name: "Carol",       age: 35,   role: "Manager"   } },
  { id: "3", label: "Dave",   type: "Person" as NodeType, props: { name: "Dave",        age: 24,   role: "Developer" } },
  { id: "4", label: "Eve",    type: "Person" as NodeType, props: { name: "Eve",         age: 30,   role: "Analyst"   } },
  { id: "5", label: "Matrix", type: "Movie"  as NodeType, props: { title: "The Matrix", year: 1999, genre: "Sci-Fi"  } },
  { id: "6", label: "Dune",   type: "Movie"  as NodeType, props: { title: "Dune",       year: 2021, genre: "Sci-Fi"  } },
  { id: "7", label: "Berlin", type: "City"   as NodeType, props: { name: "Berlin", country: "Germany", pop: "3.8M"  } },
  { id: "8", label: "Tokyo",  type: "City"   as NodeType, props: { name: "Tokyo",  country: "Japan",   pop: "14M"   } },
] satisfies { id: string; label: string; type: NodeType; props: Record<string, string | number> }[];

const nodeMetaMap = new Map(NODE_META.map((n) => [n.id, n]));

const nvlNodes: Node[] = NODE_META.map(({ id, label, type }) => ({
  id,
  caption: label,
  color:   TYPE_COLORS[type],
  size:    TYPE_SIZES[type],
}));

const nvlRels: Relationship[] = [
  { id: "r0",  from: "0", to: "1", caption: "KNOWS",    color: "#854F0B" },
  { id: "r1",  from: "0", to: "2", caption: "KNOWS",    color: "#854F0B" },
  { id: "r2",  from: "1", to: "4", caption: "KNOWS",    color: "#854F0B" },
  { id: "r3",  from: "2", to: "3", caption: "KNOWS",    color: "#854F0B" },
  { id: "r4",  from: "3", to: "4", caption: "KNOWS",    color: "#854F0B" },
  { id: "r5",  from: "0", to: "7", caption: "LIVES_IN", color: "#185FA5" },
  { id: "r6",  from: "1", to: "7", caption: "LIVES_IN", color: "#185FA5" },
  { id: "r7",  from: "2", to: "8", caption: "LIVES_IN", color: "#185FA5" },
  { id: "r8",  from: "4", to: "8", caption: "LIVES_IN", color: "#185FA5" },
  { id: "r9",  from: "0", to: "5", caption: "LIKES",    color: "#3B6D11" },
  { id: "r10", from: "1", to: "6", caption: "LIKES",    color: "#3B6D11" },
  { id: "r11", from: "3", to: "5", caption: "LIKES",    color: "#3B6D11" },
  { id: "r12", from: "2", to: "6", caption: "LIKES",    color: "#3B6D11" },
  { id: "r13", from: "4", to: "6", caption: "LIKES",    color: "#3B6D11" },
];

const FILTERS = [
  { key: "all",      label: "Todos",     color: "#534AB7" },
  { key: "KNOWS",    label: ":KNOWS",    color: "#854F0B" },
  { key: "LIVES_IN", label: ":LIVES_IN", color: "#185FA5" },
  { key: "LIKES",    label: ":LIKES",    color: "#3B6D11" },
];

const LEGEND = [
  ...Object.entries(TYPE_COLORS).map(([label, color]) => ({ label, color })),
  { label: "KNOWS",    color: "#854F0B" },
  { label: "LIVES_IN", color: "#185FA5" },
  { label: "LIKES",    color: "#3B6D11" },
];

// ─── Component ───────────────────────────────────────────────────────────────

const DEFAULT_INFO = "Haz clic en un nodo para ver sus propiedades · Arrastra para mover · Usa rueda del ratón para zoom";

export function Neo4jSocialGraph() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const nvlRef        = useRef<NVLInstance | null>(null);
  const [mounted,       setMounted]      = useState(false);
  const [activeFilter,  setActiveFilter] = useState("all");
  const [infoText,      setInfoText]     = useState(DEFAULT_INFO);
  const [tooltip, setTooltip] = useState({ html: "", x: 0, y: 0, visible: false });

  // Two-pass mount — avoids SSR/hydration mismatch
  useEffect(() => { setMounted(true); }, []);

  // Load NVL only on the client
  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const el = containerRef.current;
    let destroyed = false;

    import("@neo4j-nvl/base").then(({ default: NVL }) => {
      if (destroyed) return;

      const nvl = new NVL(el, nvlNodes, nvlRels, {
        renderer: "canvas",
        layout: "forceDirected",
        disableTelemetry: true,
      });
      nvlRef.current = nvl;

      const onMouseMove = (e: MouseEvent) => {
        const hit = nvl.getHits(e, ["node"]).nvlTargets.nodes.find((n) => n.insideNode);
        const meta = hit ? nodeMetaMap.get(hit.data.id) : null;
        if (meta) {
          const { left, top } = el.getBoundingClientRect();
          setTooltip({
            visible: true,
            x: e.clientX - left + 14,
            y: e.clientY - top  - 10,
            html: `<strong>${meta.label}</strong> <span>:${meta.type}</span><br/>` +
                  Object.entries(meta.props).map(([k, v]) => `${k}: ${v}`).join(" · "),
          });
        } else {
          setTooltip((t) => ({ ...t, visible: false }));
        }
      };

      const onClick = (e: MouseEvent) => {
        const hit  = nvl.getHits(e, ["node"]).nvlTargets.nodes.find((n) => n.insideNode);
        const meta = hit ? nodeMetaMap.get(hit.data.id) : null;
        setInfoText(
          meta
            ? `MATCH (n:${meta.type} {${Object.entries(meta.props).map(([k, v]) => `${k}: "${v}"`).join(", ")}}) RETURN n`
            : DEFAULT_INFO
        );
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        nvl.setZoom(nvl.getScale() * (e.deltaY > 0 ? 0.9 : 1.1));
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("click",     onClick);
      el.addEventListener("wheel",     onWheel, { passive: false });

      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("click",     onClick);
        el.removeEventListener("wheel",     onWheel);
      };
    });

    return () => {
      destroyed = true;
      nvlRef.current?.destroy();
      nvlRef.current = null;
    };
  }, [mounted]);

  const handleFilter = (key: string) => {
    const nvl = nvlRef.current;
    if (!nvl) return;
    nvl.removeRelationshipsWithIds(nvlRels.map((r) => r.id));
    nvl.addElementsToGraph([], key === "all" ? nvlRels : nvlRels.filter((r) => r.caption === key));
    setActiveFilter(key);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const filterBar = (
    <div className="flex flex-wrap gap-2 mb-2">
      {FILTERS.map(({ key, label, color }) => (
        <button
          key={key}
          onClick={mounted ? () => handleFilter(key) : undefined}
          disabled={!mounted}
          style={{
            borderColor: color,
            color:            activeFilter === key ? "#fff" : color,
            backgroundColor:  activeFilter === key ? color  : "transparent",
          }}
          className="text-xs px-3 py-1 rounded-full border transition-all disabled:opacity-50"
        >
          {label}
        </button>
      ))}
    </div>
  );

  const legend = (
    <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
      {LEGEND.map(({ label, color }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  );

  return (
    <div className="py-2">
      {filterBar}

      <div
        className="relative rounded-lg border bg-card overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: 420 }}
      >
        <div ref={containerRef} className="w-full h-full" />

        {tooltip.visible && (
          <div
            className="absolute pointer-events-none z-10 rounded border bg-background px-3 py-2 text-xs text-foreground max-w-[200px] shadow-sm"
            style={{ left: tooltip.x, top: tooltip.y }}
            dangerouslySetInnerHTML={{ __html: tooltip.html }}
          />
        )}
      </div>

      <p className="mt-1.5 text-xs text-muted-foreground min-h-[18px]">
        {mounted ? infoText : "Cargando..."}
      </p>

      {legend}
    </div>
  );
}