import data from '../app/resultados.json';

export default function ResultadosFecha() {
    return (
        <div className="flex flex-col gap-4 h-fit rounded-md bg-surface-container-low">
            <h2 className="text-on-background p-4 rounded-t-md bg-surface-container w-full font-headline text-xl mb-2 border-l-4 border-primary">
                Partidos - Fecha {data.fecha_actual}
            </h2>

            <div className='flex flex-row'>



                {data.partidos.map((partido) => (
                    <div
                        key={partido.id}
                        className="bg-surface-container rounded-md mx-4 mb-4 p-4 min-w-[250px] hover:bg-surface-container-high transition-colors flex flex-col items-center justify-between"
                    >
                        {/* Badge de Estado */}
                        <span className={`text-[10px] uppercase font-bold self-start tracking-wider ${partido.estado === 'en_curso'
                            ? 'text-secondary-fixed animate-pulse'
                            : 'text-on-surface-variant/30'
                            }`}>
                            {partido.estado === 'en_curso' ? `• En vivo ${partido.minuto}'` : partido.estado}
                        </span>
                        <div className='flex flex-row w-full items-center justify-between h-full'>
                            <div className='flex flex-col items-start w-3/4 justify-center gap-3 '>
                                {/* Equipo Local */}
                                <div className="flex-1 text-left font-body text-md text-on-surface font-medium">
                                    {partido.local}
                                </div>

                                {/* Equipo Visitante */}
                                <div className="flex-1 text-left font-body text-md text-on-surface font-medium">
                                    {partido.visitante}
                                </div>
                            </div>

                            {/* Marcador / Horario */}
                            <div className="flex flex-col items-end justify-center  w-1/4 min-w-[100px]">
                                {partido.estado === 'programado' ? (
                                    <span className="text-sm font-bold text-primary bg-primary-container px-3 py-1 rounded-full">
                                        {partido.horario}
                                    </span>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <span className="text-2xl font-headline font-bold text-on-surface">
                                            {partido.goles_local}
                                        </span>
                                        <span className="text-2xl font-headline font-bold text-on-surface">
                                            {partido.goles_visitante}
                                        </span>
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}