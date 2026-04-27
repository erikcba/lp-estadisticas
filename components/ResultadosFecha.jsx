"use client"
import { useRef } from 'react';
import data from '../app/resultados.json';

export default function ResultadosFecha() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            // Desplaza aproximadamente el ancho de una tarjeta + gap
            const scrollTo = direction === 'left'
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col gap-2 h-fit rounded-xl bg-surface-container-low overflow-hidden">
            {/* Cabecera con Botones */}
            <div className="flex flex-col gap-3 border-l-4 border-primary bg-surface-container p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <h2 className="min-w-0 font-headline text-base text-on-background sm:text-lg lg:text-xl">
                    Partidos - Fecha {data.fecha_actual}
                </h2>

                <div className="flex shrink-0 gap-2 self-end sm:self-auto">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full hover:bg-primary/10 hover:cursor-pointer text-primary transition-colors border border-outline-variant/30"
                        aria-label="Anterior"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full hover:bg-primary/10 hover:cursor-pointer text-primary transition-colors border border-outline-variant/30"
                        aria-label="Siguiente"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Contenedor del Carrusel */}
            <div
                ref={scrollRef}
                className="flex flex-row overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 p-4 scroll-smooth"
            >
                {data.partidos.map((partido) => (
                    <div
                        key={partido.id}
                        className="bg-surface-container-high rounded-2xl p-5 min-w-[280px] md:min-w-[320px] snap-center border border-outline-variant/20 hover:border-primary/30 transition-all flex flex-col gap-4 shadow-sm"
                    >
                        <div className="flex justify-between items-center">
                            <span className={`text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-md ${partido.estado === 'en_curso'
                                    ? 'bg-secondary-fixed text-on-secondary-fixed animate-pulse'
                                    : 'bg-outline-variant/20 text-on-surface-variant'
                                }`}>
                                {partido.estado === 'en_curso' ? `• En vivo ${partido.minuto}'` : partido.estado}
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col gap-3 flex-1">
                                <div className="text-md text-on-surface font-semibold truncate">{partido.local}</div>
                                <div className="text-md text-on-surface font-semibold truncate">{partido.visitante}</div>
                            </div>

                            <div className="flex flex-col items-center justify-center bg-background/50 rounded-xl px-4 py-2 min-w-[60px]">
                                {partido.estado === 'programado' ? (
                                    <span className="text-sm font-bold text-primary">{partido.horario}</span>
                                ) : (
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-xl font-black text-on-surface italic">{partido.goles_local}</span>
                                        <div className="w-full h-[1px] bg-outline-variant/30" />
                                        <span className="text-xl font-black text-on-surface italic">{partido.goles_visitante}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="min-w-[1px] pr-4" />
            </div>
        </div>
    );
}