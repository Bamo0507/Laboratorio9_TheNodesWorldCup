"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { pelicula: "The Matrix", rating: 8.7, reseñas: 1820 },
  { pelicula: "Inception", rating: 8.8, reseñas: 2340 },
  { pelicula: "Interstellar", rating: 8.6, reseñas: 1970 },
  { pelicula: "The Dark Knight", rating: 9.0, reseñas: 2780 },
  { pelicula: "Pulp Fiction", rating: 8.9, reseñas: 2100 },
  { pelicula: "Fight Club", rating: 8.8, reseñas: 1650 },
];

const chartConfig = {
  reseñas: {
    label: "Reseñas",
    color: "var(--color-primary)",
  },
};

export function ShadcnChartDemo() {
  return (
    <div className="p-6 h-full flex flex-col gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-[family-name:var(--font-fira-code)]">
          // Demo — Bar Chart con datos del dataset Movies
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Cantidad de reseñas por película. Construido con{" "}
          <code className="font-[family-name:var(--font-fira-code)] bg-muted px-1 rounded">
            shadcn/ui chart
          </code>{" "}
          + Recharts.
        </p>
      </div>
      <ChartContainer config={chartConfig} className="flex-1 min-h-0">
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 48 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="pelicula"
            tick={{ fontSize: 10, fontFamily: "var(--font-fira-code)" }}
            angle={-25}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 10, fontFamily: "var(--font-fira-code)" }}
            width={40}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="reseñas"
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
