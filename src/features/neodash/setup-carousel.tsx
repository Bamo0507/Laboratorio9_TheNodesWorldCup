"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pasos = [
  {
    titulo: "Abrir NeoDash y crear dashboard",
    descripcion:
      'Ir a neodash.graphapp.io y seleccionar la opción "New Dashboard" para iniciar la creación de un nuevo dashboard.',
    imagen: "/screenshots/neodash/01.png",
  },
  {
    titulo: "Conectar con tu instancia de Aura",
    descripcion:
      "Llenar el formulario de conexión con las credenciales de la instancia de Neo4j Aura. Esta información se obtiene del archivo .txt generado al crear la instancia. El puerto por defecto de Aura es 7687.",
    imagen: "/screenshots/neodash/02.png",
  },
  {
    titulo: "Personalizar el dashboard",
    descripcion:
      "En la nueva ventana se puede cambiar el nombre al dashboard, agregar páginas adicionales y especificar el query Cypher para desplegar la data.",
    imagen: "/screenshots/neodash/03.png",
  },
  {
    titulo: "Agregar un widget",
    descripcion:
      'Seleccionar el cuadrado con el ícono "+" para habilitar la sección donde se colocará el query y el tipo de visualización deseado.',
    imagen: "/screenshots/neodash/04.png",
  },
  {
    titulo: "Tipos de widget disponibles",
    descripcion:
      "NeoDash soporta múltiples tipos de widget: tabla, grafo, gráfico de barras, pie, líneas, mapas, valor singular, JSON, Markdown e incluso iframe (para incrustar páginas externas — exclusivo de NeoDash, no disponible en Aura Dashboards).",
    imagen: "/screenshots/neodash/05.png",
  },
  {
    titulo: "Settings avanzados por widget",
    descripcion:
      "Cada widget expone una sección de Settings avanzados donde se puede configurar: color de fondo, padding, márgenes, leyendas, escalas y otros atributos de presentación.",
    imagen: "/screenshots/neodash/06.png",
  },
  {
    titulo: "Funcionalidades post-construcción",
    descripcion:
      "Una vez construido el dashboard es posible: agregar más páginas, exportar como JSON, configurar extensiones para visualizaciones avanzadas, aplicar estilos condicionales, agregar formularios interactivos y manejar control de acceso.",
    imagen: "/screenshots/neodash/07.png",
  },
];

export function SetupCarousel() {
  const [actual, setActual] = useState(0);

  const anterior = () => setActual((p) => (p - 1 + pasos.length) % pasos.length);
  const siguiente = () => setActual((p) => (p + 1) % pasos.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const paso = pasos[actual];

  return (
    <div className="flex flex-col">
      {/* 1. Descripción */}
      <div className="px-6 py-4 border-b border-border bg-card space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-[family-name:var(--font-fira-code)]">
          // Paso {actual + 1} — {paso.titulo}
        </p>
        <p className="text-sm text-foreground leading-relaxed">{paso.descripcion}</p>
      </div>

      {/* 2. Dots */}
      <div className="flex items-center justify-center gap-1.5 px-6 py-3 border-b border-border bg-card">
        {pasos.map((_, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
              i === actual
                ? "w-5 bg-primary"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Ir al paso ${i + 1}`}
          />
        ))}
      </div>

      {/* 3. Imagen con flechas */}
      <div className="relative h-[480px] bg-white overflow-hidden">
        <Image
          src={paso.imagen}
          alt={paso.titulo}
          fill
          className="object-contain p-4"
          priority
        />

        {/* Flecha izquierda */}
        <button
          onClick={anterior}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/90 border border-border flex items-center justify-center cursor-pointer shadow-sm transition-all duration-150 hover:bg-background hover:border-primary/50 hover:shadow-md hover:scale-105 active:scale-95"
          aria-label="Paso anterior"
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={siguiente}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/90 border border-border flex items-center justify-center cursor-pointer shadow-sm transition-all duration-150 hover:bg-background hover:border-primary/50 hover:shadow-md hover:scale-105 active:scale-95"
          aria-label="Paso siguiente"
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>

        {/* Contador esquina */}
        <div className="absolute top-3 right-3 bg-background/80 border border-border rounded-md px-2 py-0.5 text-[10px] font-[family-name:var(--font-fira-code)] text-muted-foreground select-none">
          {actual + 1} / {pasos.length}
        </div>
      </div>
    </div>
  );
}
