import Image from 'next/image';

const PartidoDestacado = ({ partido }) => {
    // partido: { local, visitante, fecha, estadio, torneo, enVivo }

    return (
        <div className="relative overflow-hidden bg-linear-to-b from-primary-container to-background text-on-primary-container rounded-md p-6 shadow-xl">

            {/* Etiqueta de Torneo o En Vivo */}
            <div className="flex justify-between items-center mb-6">
                {partido.enVivo && (
                    <div className="flex items-center gap-2 bg-green-600/40 border border-green-600 text-white px-3 py-1 rounded-full animate-pulse">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-xs font-bold uppercase">En Vivo - {partido.minuto || `65'`}</span>
                    </div>
                )}
                <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    {partido.torneo}
                </span>
            </div>

            {/* Versus Principal */}
            <div className="flex items-center justify-around gap-4">

                {/* Local */}
                <div className="flex flex-col items-center gap-3 flex-1">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-lg">
                        <Image
                            src={partido.local.escudo}
                            alt={partido.local.nombre}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    <span className="font-headline text-lg md:text-2xl font-bold text-center leading-tight">
                        {partido.local.nombre}
                    </span>
                </div>

                {/* Marcador o VS */}
                <div className="flex flex-col items-center">
                    {partido.score ? (
                        <div className="flex items-center gap-4">
                            <span className="text-4xl md:text-6xl text-white font-black">{partido.local.score}</span>
                            <span className="text-xl md:text-2xl text-white font-black">-</span>
                            <span className="text-4xl md:text-6xl text-white font-black">{partido.visitante.score}</span>
                        </div>
                    ) : (
                        <div className="text-2xl md:text-4xl font-black opacity-30 italic">VS</div>
                    )}
                </div>

                {/* Visitante */}
                <div className="flex flex-col items-center gap-3 flex-1">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 drop-shadow-lg">
                        <Image
                            src={partido.visitante.escudo}
                            alt={partido.visitante.nombre}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                    <span className="font-headline text-lg md:text-2xl font-bold text-center leading-tight">
                        {partido.visitante.nombre}
                    </span>
                </div>
            </div>

            {/* Info extra al pie */}
            <div className="mt-8 pt-4 border-t border-on-primary-container/10 flex flex-col md:flex-row justify-between items-center gap-2 opacity-80 text-sm">
                <div className="flex items-center gap-2">
                    <span className="font-medium">{partido.fecha}</span>
                </div>
                <div className="flex items-center gap-2 italic">
                    <span>{partido.estadio}</span>
                </div>
            </div>

            {/* Decoración sutil de fondo (Material Style) */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-3xl"></div>
        </div>
    );
};

export default PartidoDestacado;