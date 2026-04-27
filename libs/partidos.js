import partidosData from "@/data/scraping/partidos.json";

const TEAM_ALIASES = {
  bocajuniors: "bocajrs",
  riverplate: "river",
  racingclub: "racing",
  rosariocentral: "central",
  unionsantafe: "union",
  tallerescordoba: "talleres",
  centralcordobasde: "centralcordoba",
  defensayjusticia: "defensa",
  atleticotucuman: "atltucuman",
  argentinosjuniors: "argentinos",
  "independiente-rivadavia": "indrivadavia",
  independienterivadavia: "indrivadavia",
  estudiantesdelaplata: "estudiantes",
  estudiantesriocuarto: "estudiantesrc",
  gimnasialaplata: "gimnasia",
  gimnasiamendoza: "gimnasiam",
};

function normalizeText(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function toCanonicalTeamName(teamName) {
  const normalized = normalizeText(teamName);
  return TEAM_ALIASES[normalized] || normalized;
}

function flattenMatchesWithFecha() {
  return partidosData.fechas.flatMap((fechaObj, fechaIndex) =>
    fechaObj.partidos.map((partido, partidoIndex) => ({
      ...partido,
      fecha: fechaObj.fecha,
      fechaNumero: fechaIndex + 1,
      ordenGlobal: `${fechaIndex.toString().padStart(2, "0")}-${partidoIndex.toString().padStart(2, "0")}`,
    }))
  );
}

export function getPartidosDeFecha(fechaNumero) {
  const fecha = partidosData.fechas[fechaNumero - 1];
  if (!fecha) return [];

  return fecha.partidos.map((partido, index) => ({
    ...partido,
    id: `f${fechaNumero}-${index + 1}`,
    fecha: fecha.fecha,
    fechaNumero,
  }));
}

export function getFeaturedMatch(teamA, teamB, fechaNumero) {
  const partidos = getPartidosDeFecha(fechaNumero);
  const canonicalA = toCanonicalTeamName(teamA);
  const canonicalB = toCanonicalTeamName(teamB);

  return (
    partidos.find((partido) => {
      const local = toCanonicalTeamName(partido.local);
      const visitante = toCanonicalTeamName(partido.visitante);
      return (local === canonicalA && visitante === canonicalB) || (local === canonicalB && visitante === canonicalA);
    }) || null
  );
}

export function getTeamFormMatches(teamName, count = 5) {
  const canonical = toCanonicalTeamName(teamName);
  const matches = flattenMatchesWithFecha().filter((partido) => {
    const local = toCanonicalTeamName(partido.local);
    const visitante = toCanonicalTeamName(partido.visitante);
    return local === canonical || visitante === canonical;
  });

  const playedMatches = matches.filter((partido) => partido.jugado);
  const upcomingMatches = matches.filter((partido) => !partido.jugado);

  return {
    ultimos: playedMatches.slice(-count).reverse(),
    proximos: upcomingMatches.slice(0, count),
  };
}

