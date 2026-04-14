import data from '../app/resultados.json';

export default function ResultadosFecha() {
    return (
        <div className="flex flex-col gap-4 h-fit bg-surface-container-low">
            <h2 className="text-on-background p-4 bg-surface-container w-full font-headline text-xl mb-2 border-l-4 border-primary">
                Resultados - Fecha {data.fecha_actual}
            </h2>

            <div>

            </div>

            {data.partidos.map((partido) => (
                <div
                    key={partido.id}
                    className="bg-surface-container mx-4 mb-4 xl:h-30 hover:bg-surface-container-high transition-colors flex items-center justify-between"
                >
                    {/* Equipo Local */}
                    <div className="flex-1 text-right font-body text-on-surface font-medium">
                        {partido.local}
                    </div>

                    {/* Marcador / Horario */}
                    <div className="flex flex-col items-center px-6 min-w-[100px]">
                        {partido.estado === 'programado' ? (
                            <span className="text-sm font-bold text-primary bg-primary-container px-3 py-1 rounded-full">
                                {partido.horario}
                            </span>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-headline font-bold text-on-surface">
                                    {partido.goles_local}
                                </span>
                                <span className="text-outline text-xs">VS</span>
                                <span className="text-2xl font-headline font-bold text-on-surface">
                                    {partido.goles_visitante}
                                </span>
                            </div>
                        )}

                        {/* Badge de Estado */}
                        <span className={`text-[10px] uppercase mt-2 font-bold tracking-wider ${partido.estado === 'en_curso'
                            ? 'text-secondary-fixed animate-pulse'
                            : 'text-on-surface-variant'
                            }`}>
                            {partido.estado === 'en_curso' ? `• En vivo ${partido.minuto}'` : partido.estado}
                        </span>
                    </div>

                    {/* Equipo Visitante */}
                    <div className="flex-1 text-left font-body text-on-surface font-medium">
                        {partido.visitante}
                    </div>
                </div>
            ))}
        </div>
    );
}