import Image from "next/image";

const PartidoDestacado = ({ partido }) => {
  return (
    <div className="relative overflow-hidden rounded-md bg-linear-to-b from-primary-container to-background p-3 text-on-primary-container shadow-xl sm:p-5 md:p-6">
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
        <span className="w-fit max-w-full rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-on-primary sm:px-3 sm:text-xs sm:tracking-widest">
          {partido.torneo}
        </span>
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
          <span className="w-full max-w-full wrap-break-word px-0.5 text-center font-headline text-xs font-bold leading-snug sm:text-base md:text-xl lg:text-2xl">
            {partido.local.nombre}
          </span>
        </div>

        {/* Marcador o VS */}
        <div className="flex min-w-0 flex-col items-center justify-center self-center px-0.5 sm:px-1">
          {partido.score ? (
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-3">
              <span className="text-2xl font-black tabular-nums text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {partido.local.score}
              </span>
              <span className="text-base font-black text-white sm:text-xl md:text-2xl">-</span>
              <span className="text-2xl font-black tabular-nums text-white sm:text-4xl md:text-5xl lg:text-6xl">
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
          <span className="w-full max-w-full wrap-break-word px-0.5 text-center font-headline text-xs font-bold leading-snug sm:text-base md:text-xl lg:text-2xl">
            {partido.visitante.nombre}
          </span>
        </div>
      </div>

      {/* Info extra al pie */}
      <div className="mt-6 flex flex-col items-center gap-2 border-t border-on-primary-container/10 pt-4 text-xs opacity-80 sm:mt-8 sm:flex-row sm:justify-between sm:text-sm">
        <span className="text-center font-medium sm:text-left">{partido.fecha}</span>
        <span className="text-center italic sm:text-right">{partido.estadio}</span>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary opacity-10 blur-3xl" />
    </div>
  );
};

export default PartidoDestacado;
