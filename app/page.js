"use client"

import TablaPosiciones from "@/components/TablaPosiciones";
import ResultadosFecha from "@/components/ResultadosFecha";
import dataZonaA from "./data/zona-a.json";
import dataZonaB from "./data/zona-b.json";
import { useState } from "react";
import ZonaSelector from "../components/ZonaSelector";
import TopList from "@/components/TopList";
import goleadores from "./data/goleadores.json";
import asistentes from "./data/asistentes.json";
import vallasInvictas from "./data/vallas-invictas.json";
import PartidoDestacado from "@/components/PartidoDestacado";
import escudoLocal from "../public/Racing_escudo.png";
import escudoVisitante from "../public/Escudo_del_Club_Atlético_Independiente.svg.png";
import EstadisticasDesplegables from "@/components/EstadisticasBtn";

export default function Home() {

  const [zonaActiva, setZonaActiva] = useState('A');
  const featuredData = {
    torneo: "Copa de la Liga - Fecha 14",
    enVivo: true,
    local: {
      nombre: "Racing Club",
      escudo: escudoLocal,
      score: '0'
    },
    visitante: {
      nombre: "Independiente",
      escudo: escudoVisitante,
      score: '1'
    },
    // Si es null, muestra el "VS"
    score: true,
    fecha: "Domingo 19 de Abril - 17:00hs",
    estadio: "Cilindro de Avellaneda"
  };

  const partido = featuredData; // Aquí podrías cargar dinámicamente el partido destacado

  return (
    <div className="container mx-auto flex flex-col items-start justify-center gap-5 px-4 pb-10 pt-4 font-sans sm:px-6 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-5">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase text-tertiary sm:text-sm">Liga profesional</p>
        <h1 className="font-headline text-2xl font-semibold text-secondary sm:text-3xl lg:text-4xl">
          Tabla de posiciones
        </h1>
      </div>
      <div className="grid w-full auto-rows-min grid-cols-1 gap-4 lg:grid-cols-6">
        <div className="order-1 min-w-0 overflow-hidden lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:order-0">
          <PartidoDestacado partido={partido} />
        </div>
        <div className="order-2 min-w-0 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:order-0">
          <ResultadosFecha />
        </div>
        <div className="order-3 flex min-w-0 flex-col gap-4 lg:col-span-2 lg:col-start-5 lg:row-span-3 lg:row-start-1 lg:order-0">
          <div className="flex flex-col gap-4 lg:pt-4">
            <ZonaSelector zonaActiva={zonaActiva} setZonaActiva={setZonaActiva} />
            <div className="w-full">
              <div className="animate-in fade-in duration-500">
                {zonaActiva === "A" ? (
                  <TablaPosiciones titulo="Zona A" equipos={dataZonaA.posiciones} />
                ) : (
                  <TablaPosiciones titulo="Zona B" equipos={dataZonaB.posiciones} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="order-4 min-w-0 lg:col-span-4 lg:col-start-1 lg:row-start-3 lg:order-0">
          <EstadisticasDesplegables>
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <TopList
                titulo="Goleadores"
                datos={goleadores.data}
                metrica="goles"
                labelMetrica="Goles"
                className="w-full lg:w-1/3 lg:min-w-0 lg:flex-1"
              />
              <TopList
                titulo="Asistencias"
                datos={asistentes.data}
                metrica="asistencias"
                labelMetrica="Asistencias"
                className="w-full lg:w-1/3 lg:min-w-0 lg:flex-1"
              />
              <TopList
                titulo="Vallas Invictas"
                datos={vallasInvictas.data}
                metrica="vallas_invictas"
                labelMetrica="Vallas Invictas"
                className="w-full lg:w-1/3 lg:min-w-0 lg:flex-1"
              />
            </div>
          </EstadisticasDesplegables>
        </div>
      </div>
    </div>
  );
}
