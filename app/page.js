"use client"

import TablaPosiciones from "@/components/TablaPosiciones";
import ResultadosFecha from "@/components/ResultadosFecha";
import torneoData from "@/data/scraping/torneo.json";
import { useState } from "react";
import ZonaSelector from "../components/ZonaSelector";
import TopList from "@/components/TopList";
import goleadores from "./data/goleadores.json";
import asistentes from "./data/asistentes.json";
import vallasInvictas from "./data/vallas-invictas.json";
import PartidoDestacado from "@/components/PartidoDestacado";
import EstadisticasDesplegables from "@/components/EstadisticasBtn";
import { getClubDataByTeamName } from "@/libs/equipos";
import { getFeaturedMatch, getPartidosDeFecha } from "@/libs/partidos";

export default function Home() {

  const [zonaActiva, setZonaActiva] = useState('A');
  const fechaActual = 15;
  const zonaAEquipos = torneoData.zona_a.map((team) => ({
    posicion: team.posicion,
    equipo: team.equipo,
    escudo: team.escudo,
    pj: team.pj,
    dg: team.diferencia_gol,
    forma: team.ultimos_partidos,
    pts: team.pts,
  }));
  const zonaBEquipos = torneoData.zona_b.map((team) => ({
    posicion: team.posicion,
    equipo: team.equipo,
    escudo: team.escudo,
    pj: team.pj,
    dg: team.diferencia_gol,
    forma: team.ultimos_partidos,
    pts: team.pts,
  }));

  const partidosFecha = getPartidosDeFecha(fechaActual);
  const superclasico = getFeaturedMatch("Boca Jrs.", "River", fechaActual);
  const escudoBoca = getClubDataByTeamName("Boca Jrs.")?.escudo || "";
  const escudoRiver = getClubDataByTeamName("River")?.escudo || "";

  const partido = superclasico
    ? {
      torneo: "Liga Profesional - Fecha 15",
      enVivo: false,
      local: {
        nombre: superclasico.local,
        escudo: getClubDataByTeamName(superclasico.local)?.escudo || (superclasico.local === "Boca Jrs." ? escudoBoca : escudoRiver),
        score: superclasico.resultado?.local ?? "-",
      },
      visitante: {
        nombre: superclasico.visitante,
        escudo: getClubDataByTeamName(superclasico.visitante)?.escudo || (superclasico.visitante === "Boca Jrs." ? escudoBoca : escudoRiver),
        score: superclasico.resultado?.visitante ?? "-",
      },
      score: Boolean(superclasico.jugado),
      fecha: `${superclasico.dia} - ${superclasico.fecha}`,
      estadio: "Superclasico Boca vs River",
    }
    : {
      torneo: "Liga Profesional - Fecha 15",
      enVivo: false,
      local: { nombre: "Boca Jrs.", escudo: escudoBoca, score: "-" },
      visitante: { nombre: "River", escudo: escudoRiver, score: "-" },
      score: false,
      fecha: "Fecha 15",
      estadio: "Superclasico",
    };

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
          <ResultadosFecha fechaNumero={fechaActual} partidos={partidosFecha} />
        </div>
        <div className="order-3 flex min-w-0 flex-col gap-4 lg:col-span-2 lg:col-start-5 lg:row-span-3 lg:row-start-1 lg:order-0">
          <div className="flex flex-col gap-4 lg:pt-4">
            <ZonaSelector zonaActiva={zonaActiva} setZonaActiva={setZonaActiva} />
            <div className="w-full">
              <div className="animate-in fade-in duration-500">
                {zonaActiva === "A" ? (
                  <TablaPosiciones titulo="Zona A" equipos={zonaAEquipos} zonaKey="a" />
                ) : (
                  <TablaPosiciones titulo="Zona B" equipos={zonaBEquipos} zonaKey="b" />
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
