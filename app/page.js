"use client"

import Image from "next/image";
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

export default function Home() {

  const [zonaActiva, setZonaActiva] = useState('A');

  return (
    <div className="container mx-auto flex flex-col items-start justify-center font-sans gap-5 pt-5">
      <div className="flex flex-col">
        <p className="text-tertiary uppercase">Liga profesional</p>
        <h1 className="text-secondary font-headline font-semibold text-4xl ">Tabla de posiciones</h1>
      </div>
      <div className="grid grid-cols-6 w-full gap-4">
        <div className="col-span-4">
          <ResultadosFecha />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-surface-container-lowest pt-4 ">
            <ZonaSelector
              zonaActiva={zonaActiva}
              setZonaActiva={setZonaActiva}
            />
            <div className="w-full">
              <div className="animate-in fade-in duration-500">
                {zonaActiva === 'A' ? (
                  <TablaPosiciones
                    titulo="Zona A"
                    equipos={dataZonaA.posiciones}
                  />
                ) : (
                  <TablaPosiciones
                    titulo="Zona B"
                    equipos={dataZonaB.posiciones}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <TopList
              titulo="Goleadores"
              datos={goleadores.data}
              metrica="goles"
              labelMetrica="Goles"
            />
            <TopList
              titulo="Maximos Asistidores"
              datos={asistentes.data}
              metrica="asistencias"
              labelMetrica="Asistencias"
            />
            <TopList
              titulo="Vallas Invictas"
              datos={vallasInvictas.data}
              metrica="vallas_invictas"
              labelMetrica="Vallas Invictas"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
