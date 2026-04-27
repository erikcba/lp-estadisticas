"use client"

import React from 'react'
import heroImg from "../../public/images/stadium.png";
import Image from 'next/image';
import { getClubDataByTeamName } from "@/libs/equipos";
import { getFeaturedMatch } from "@/libs/partidos";
import { useState } from 'react';
import formacionData from "../../data/scraping/clubes"

const Page = () => {

  const tabs = ['Resultados', 'Formaciones', 'Historial'];
  const [activeTab, setActiveTab] = useState('Resultados');

  const fechaActual = 15;
  const superclasico = getFeaturedMatch("Boca Jrs.", "River", fechaActual);
  const escudoBoca = getClubDataByTeamName("Boca Jrs.")?.escudo || "";
  const escudoRiver = getClubDataByTeamName("River")?.escudo || "";
  const partido = superclasico
    ? {
      torneo: "Liga Profesional - Fecha 15",
      enVivo: true,
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

  const datosLocal = formacionData.find(equipo => equipo.nombre === partido.local.nombre);
  const datosVisitante = formacionData.find(equipo => equipo.nombre === partido.visitante.nombre);
  return (
    <div className="w-full flex flex-col items-start justify-center font-sans">
      <div className="relative w-full xl:h-[400px] flex flex-col gap-6 items-center justify-center overflow-hidden rounded-lg">
        {/* La imagen de fondo */}
        <Image
          src={heroImg}
          alt="Estadio de fútbol"
          placeholder="blur" // Opcional: muestra una versión borrosa mientras carga
          fill
          className="object-cover -z-10" // Se envía al fondo con -z-10
          priority // Carga la imagen de inmediato
        />

        <span className="w-fit max-w-full rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-primary sm:px-3 sm:text-xs sm:tracking-widest">
          {partido.torneo}
        </span>
        {/* El contenido sobre la imagen */}
        <div className="flex flex-col items-center justify-center gap-4 px-8 py-6 bg-surface-container-lowest/40 backdrop-blur-md rounded-2xl border border-white/5">
          {/* Etiqueta de Torneo o En Vivo */}
          <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            {partido.enVivo && (
              <div className="flex w-fit max-w-full items-center gap-2 rounded-full border border-green-600 bg-green-600/40 px-2.5 py-1 text-white animate-pulse sm:px-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                <span className="text-[11px] font-bold uppercase sm:text-xs">
                  En Vivo - {partido.minuto || `65'`}
                </span>
              </div>
            )}
          </div>
          {/* Marcador: grid para que las columnas laterales puedan encoger sin recortar el centro */}
          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-x-1 gap-y-2 sm:items-center sm:gap-x-2 md:gap-x-4">
            {/* Local */}
            <div className="flex min-w-0 flex-col items-center gap-2 sm:gap-3">
              <div className="relative h-14 w-14 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Image
                  src={partido.local.escudo}
                  alt={partido.local.nombre}
                  fill
                  className="object-contain drop-shadow-lg"
                  unoptimized
                />
              </div>
              <span className="w-full max-w-full wrap-break-word text-on-background px-0.5 text-center font-headline uppercase tracking-widest whitespace-nowrap text-xs font-bold leading-snug sm:text-base md:text-xl lg:text-2xl">
                {partido.local.nombre}
              </span>
            </div>

            {/* Marcador o VS */}
            <div className="flex min-w-0 flex-col items-center justify-center self-center px-0.5 sm:px-1">
              {partido.score ? (
                <div className="flex items-center gap-0.5 sm:gap-1 md:gap-3 bg-surface-container-lowest/40 backdrop-blur-md rounded-2xl p-4 ">
                  <span className="text-2xl leading-none font-black tabular-nums text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {partido.local.score}
                  </span>
                  <span className="text-base font-black leading-none text-white sm:text-xl md:text-2xl">-</span>
                  <span className="text-2xl leading-none font-black tabular-nums text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {partido.visitante.score}
                  </span>
                </div>
              ) : (
                <div className="text-xl font-black italic opacity-30 sm:text-2xl md:text-4xl">VS</div>
              )}
            </div>

            {/* Visitante */}
            <div className="flex min-w-0 flex-col items-center gap-2 sm:gap-3">
              <div className="relative h-14 w-14 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Image
                  src={partido.visitante.escudo}
                  alt={partido.visitante.nombre}
                  fill
                  className="object-contain drop-shadow-lg"
                  unoptimized
                />
              </div>
              <span className="w-full max-w-full wrap-break-word text-on-background px-0.5 text-center font-headline uppercase tracking-widest whitespace-nowrap text-xs font-bold leading-snug sm:text-base md:text-xl lg:text-2xl">
                {partido.visitante.nombre}
              </span>
            </div>
          </div>

          {/* Info extra al pie */}
          <div className="flex flex-col items-center gap-2 border-t border-on-primary-container/10 pt-4 text-xs opacity-80 sm:flex-row sm:justify-between sm:text-sm">
            <span className="text-center font-medium sm:text-left text-on-background">{partido.fecha}</span>
            <span className="text-center italic sm:text-right text-on-background">{partido.estadio}</span>
          </div>

        </div>
      </div>
      <div className="bg-surface-container-low sticky w-full top-[72px] z-30 border-b border-outline-variant/10">
        <div className="container mx-auto px-6 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
              py-4 font-headline text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all ease-in-out hover:cursor-pointer duration-200
              ${activeTab === tab
                  ? "text-green-500 border-b-2 border-green-500" // Clases si está activa
                  : "text-on-surface-variant hover:text-on-surface border-b-2 border-transparent" // Clases si no lo está
                }
            `}
            >
              {tab === 'Resultados' ? 'Resultado en vivo' : tab}
            </button>
          ))}
        </div>
      </div>
      <div className='w-full container mx-auto'>
        {activeTab === 'Formaciones' && (
          <div className="p-6 flex flex-col items-start justify-start gap-4">
            <h2 className=' text-2xl font-bold text-on-background mt-6 mb-4 px-6'>
              Formaciones
            </h2>
            <div className='flex flex-row items-center justify-center w-full bg-surface-container-lowest rounded-2xl p-6 gap-8'>
              <div className='flex w-1/2 flex-col items-center gap-4'>
                <h2 className='text-md font-medium text-on-background/60 uppercase tracking-widest whitespace-nowrap '>
                  Local
                </h2>
                <div className='relative h-14 w-14 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24'>
                  <Image
                    src={partido.local.escudo}
                    alt={partido.local.nombre}
                    fill
                    className="object-contain drop-shadow-lg"
                    unoptimized
                  />
                </div>
                <h2 className='text-2xl font-bold text-on-background uppercase tracking-widest whitespace-nowrap '>
                  {partido.local.nombre}
                </h2>
              </div>
              <h2 className='text-xl font-bold text-on-background/60 uppercase tracking-widest whitespace-nowrap '>
                VS
              </h2>
              <div className='flex w-1/2 flex-col items-center gap-4'>
                <h2 className='text-md font-medium text-on-background/60 uppercase tracking-widest whitespace-nowrap '>
                  Visitante
                </h2>
                <div className='relative h-14 w-14 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24'>
                  <Image
                    src={partido.visitante.escudo}
                    alt={partido.visitante.nombre}
                    fill
                    className="object-contain drop-shadow-lg"
                    unoptimized
                  />
                </div>
                <h2 className='text-2xl font-bold text-on-background uppercase tracking-widest whitespace-nowrap '>
                  {partido.visitante.nombre}
                </h2>
              </div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-6'>
              {/* Columna Local */}
              <div className='bg-surface-container-lowest rounded-2xl p-6 border border-white/5'>
                <h3 className="text-green-500 font-bold mb-4 uppercase tracking-wider border-b border-white/10 pb-2">
                  Plantel {partido.local.nombre}
                </h3>
                <ul className="flex flex-col gap-3">
                  {datosLocal ? datosLocal.plantel.map((jugador, index) => (
                    <li key={index} className="flex items-center justify-between text-on-background/80 hover:bg-white/5 p-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono bg-white/10 w-6 h-6 flex items-center justify-center rounded text-green-400">
                          {jugador.numero}
                        </span>
                        <span className="font-medium">{jugador.nombre}</span>
                      </div>
                      <span className="text-[10px] uppercase opacity-50 bg-white/5 px-2 py-1 rounded">
                        {jugador.posicion_rol}
                      </span>
                    </li>
                  )) : <p>Cargando formación...</p>}
                </ul>
              </div>

              {/* Columna Visitante */}
              <div className='bg-surface-container-lowest rounded-2xl p-6 border border-white/5'>
                <h3 className="text-green-500 font-bold mb-4 uppercase tracking-wider border-b border-white/10 pb-2">
                  Plantel {partido.visitante.nombre}
                </h3>
                <ul className="flex flex-col gap-3">
                  {datosVisitante ? datosVisitante.plantel.map((jugador, index) => (
                    <li key={index} className="flex items-center justify-between text-on-background/80 hover:bg-white/5 p-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono bg-white/10 w-6 h-6 flex items-center justify-center rounded text-green-400">
                          {jugador.numero}
                        </span>
                        <span className="font-medium">{jugador.nombre}</span>
                      </div>
                      <span className="text-[10px] uppercase opacity-50 bg-white/5 px-2 py-1 rounded">
                        {jugador.posicion_rol}
                      </span>
                    </li>
                  )) : <p>Cargando formación...</p>}
                </ul>
              </div>
            </div>
          </div>

        )}
      </div>

    </div>
  )
}

export default Page