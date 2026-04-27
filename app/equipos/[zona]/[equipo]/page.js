import Image from "next/image";
import Link from "next/link";
import { getClubDataByTeamName, getTeamBySlug } from "@/libs/equipos";
import { getTeamFormMatches } from "@/libs/partidos";

export default async function EquipoPage({ params }) {
  const { zona, equipo } = await params;
  const team = getTeamBySlug(zona, equipo);

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-4 text-on-surface-variant">No se encontro el equipo solicitado.</p>
        <Link href="/" className="font-medium text-primary hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const club = getClubDataByTeamName(team.equipo);
  const { ultimos, proximos } = getTeamFormMatches(team.equipo, 5);

  if (!club) {
    return (
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="mb-4 text-on-surface-variant">
          No se encontraron datos del club en el scrap para <strong>{team.equipo}</strong>.
        </p>
        <Link href="/" className="font-medium text-primary hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-xl border-l-4 border-[#20ff6a] p-4 shadow-sm sm:p-5 md:p-8"
        style={{ backgroundImage: "url('/images/stadium.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-[#0a1220]/80" />
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#20ff6a] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#06220f]">
                {club.apodo || "Club"}
              </span>
              <span className="text-xs font-semibold text-white/70">Fundado en {club.fundacion || "s/d"}</span>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
              <div className="relative h-24 w-24 shrink-0 rounded-lg bg-[#1a2a44]/85 p-3 sm:h-28 sm:w-28">
                <Image
                  src={club.escudo}
                  alt={`Escudo de ${club.nombre}`}
                  fill
                  className="object-contain p-3"
                  unoptimized
                  sizes="112px"
                />
              </div>
              <div className="max-w-full space-y-2 sm:max-w-120">
                <h1 className="font-headline text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
                  {club.nombre}
                </h1>
                <p className="max-w-full text-base leading-tight text-white/85">
                  {club.estadio}
                  <span className="mx-2 hidden sm:inline">•</span>
                  <span className="block sm:inline">{club.club_de}</span>
                </p>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 text-center sm:w-auto">
              <div className="rounded-md bg-black/30 p-3 backdrop-blur-sm sm:min-w-24">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Posicion</p>
                <p className="text-4xl font-black text-[#20ff6a]">{team.posicion}º</p>
              </div>
              <div className="rounded-md bg-black/30 p-3 backdrop-blur-sm sm:min-w-24">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Puntos</p>
                <p className="text-4xl font-black text-white">{team.pts}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-medium uppercase text-white/70 sm:gap-3">
            <span className="rounded bg-white/10 px-2 py-1">Zona {zona.toUpperCase()}</span>
            <span className="rounded bg-white/10 px-2 py-1">PJ {team.pj}</span>
            <span className="rounded bg-white/10 px-2 py-1">DG {team.dg > 0 ? `+${team.dg}` : team.dg}</span>
          </div>
        </div>
      </div>

      <section className="rounded-xl bg-surface-container-low p-5 shadow-sm">
        <h2 className="mb-4 border-l-4 border-primary pl-3 font-headline text-xl text-on-surface">Datos del club</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4">
            <p className="text-xs uppercase text-tertiary">Nombre</p>
            <p className="font-semibold text-on-surface">{club.nombre}</p>
          </article>
          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4">
            <p className="text-xs uppercase text-tertiary">Apodo</p>
            <p className="font-semibold text-on-surface">{club.apodo || "s/d"}</p>
          </article>
          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4">
            <p className="text-xs uppercase text-tertiary">Fundacion</p>
            <p className="font-semibold text-on-surface">{club.fundacion || "s/d"}</p>
          </article>
          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4 sm:col-span-2">
            <p className="text-xs uppercase text-tertiary">Estadio</p>
            <p className="font-semibold text-on-surface">{club.estadio || "s/d"}</p>
          </article>
          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4 sm:col-span-2">
            <p className="text-xs uppercase text-tertiary">Ubicacion</p>
            <p className="font-semibold text-on-surface">{club.club_de || "s/d"}</p>
          </article>
        </div>
      </section>

      <section className="rounded-xl bg-surface-container-low p-5 shadow-sm">
        <h2 className="mb-4 border-l-4 border-primary pl-3 font-headline text-xl text-on-surface">Rendimiento reciente</h2>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">Ultimos 5 partidos</h3>
            <div className="space-y-2">
              {ultimos.map((partido, index) => {
                const esLocal = partido.local === team.equipo;
                const golesEquipo = esLocal ? partido.resultado?.local : partido.resultado?.visitante;
                const golesRival = esLocal ? partido.resultado?.visitante : partido.resultado?.local;
                const rival = esLocal ? partido.visitante : partido.local;
                const estadoResultado = golesEquipo > golesRival ? "Ganado" : golesEquipo < golesRival ? "Perdido" : "Empatado";
                const estadoColor =
                  estadoResultado === "Ganado"
                    ? "bg-secondary-fixed text-on-secondary-fixed"
                    : estadoResultado === "Perdido"
                      ? "bg-error text-on-error"
                      : "bg-outline-variant text-on-surface";

                return (
                  <div
                    key={`${partido.url_partido}-last-${index}`}
                    className="flex flex-col gap-2 rounded-md border border-outline-variant/20 bg-surface-container-high p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-on-surface">
                        {partido.local} {partido.resultado?.local ?? "-"} - {partido.resultado?.visitante ?? "-"} {partido.visitante}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {partido.fecha} - {partido.dia} - vs {rival}
                      </p>
                    </div>
                    <span className={`w-fit rounded-md px-2 py-1 text-xs font-semibold ${estadoColor}`}>{estadoResultado}</span>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-lg border border-outline-variant/30 bg-surface-container p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">Proximos 5 partidos</h3>
            <div className="space-y-2">
              {proximos.map((partido, index) => {
                const esLocal = partido.local === team.equipo;
                const rival = esLocal ? partido.visitante : partido.local;

                return (
                  <div
                    key={`${partido.url_partido}-next-${index}`}
                    className="flex flex-col gap-2 rounded-md border border-outline-variant/20 bg-surface-container-high p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-on-surface">
                        {partido.local} vs {partido.visitante}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {partido.fecha} - {partido.dia} - {esLocal ? "Local" : "Visitante"} vs {rival}
                      </p>
                    </div>
                    <span className="w-fit rounded-md bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">Programado</span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <section className="rounded-xl bg-surface-container-low p-5 shadow-sm">
        <h2 className="mb-4 border-l-4 border-primary pl-3 font-headline text-xl text-on-surface">Plantel</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                <th className="p-2">Grupo</th>
                <th className="p-2">#</th>
                <th className="p-2">Jugador</th>
                <th className="p-2">Rol</th>
                <th className="p-2">Edad</th>
                <th className="p-2">Nacimiento</th>
                <th className="p-2">Altura</th>
                <th className="p-2">Bandera</th>
              </tr>
            </thead>
            <tbody>
              {club.plantel.map((jugador, index) => (
                <tr key={`${club.slug}-${jugador.numero}-${index}`} className="border-b border-outline-variant/20 text-on-surface">
                  <td className="p-2">{jugador.grupo || "-"}</td>
                  <td className="p-2 font-semibold">{jugador.numero || "-"}</td>
                  <td className="p-2">{jugador.nombre}</td>
                  <td className="p-2">{jugador.posicion_rol || "-"}</td>
                  <td className="p-2">{jugador.edad || "-"}</td>
                  <td className="p-2">{jugador.nacimiento || "-"}</td>
                  <td className="p-2">{jugador.altura || "-"}</td>
                  <td className="p-2">
                    {jugador.pais_bandera ? (
                      <Image
                        src={jugador.pais_bandera}
                        alt={`Bandera de ${jugador.nombre}`}
                        width={24}
                        height={16}
                        className="h-4 w-6 rounded-sm object-cover"
                        unoptimized
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
