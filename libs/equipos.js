import torneoData from "@/data/scraping/torneo.json";
import clubesData from "@/data/scraping/clubes.json";

const ZONAS = {
  a: torneoData.zona_a.map((team) => ({
    posicion: team.posicion,
    equipo: team.equipo,
    escudo: team.escudo,
    pj: team.pj,
    dg: team.diferencia_gol,
    pts: team.pts,
  })),
  b: torneoData.zona_b.map((team) => ({
    posicion: team.posicion,
    equipo: team.equipo,
    escudo: team.escudo,
    pj: team.pj,
    dg: team.diferencia_gol,
    pts: team.pts,
  })),
};

const TEAM_ALIASES = {
  estudianteslp: "estudiantes-de-la-plata",
  argentinosjuniors: "argentinos-juniors",
  clubatleticounion: "union-santa-fe",
  union: "union-santa-fe",
  newellsoldboys: "newell's-old-boys",
  talleresdecordoba: "talleres-cordoba",
  centralcordobasde: "central-cordoba-sde",
  bocajuniors: "boca-juniors",
  racingclub: "racing-club",
  riverplate: "river-plate",
  defensayjusticia: "defensa-y-justicia",
};

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function compactMatchText(value) {
  return normalizeText(value || "").replace(/[^a-z0-9]/g, "");
}

export function slugifyTeamName(teamName) {
  return normalizeText(teamName)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getZonaTeams(zona) {
  return ZONAS[zona] || [];
}

export function getTeamBySlug(zona, teamSlug) {
  const zonaTeams = getZonaTeams(zona);
  return zonaTeams.find((team) => slugifyTeamName(team.equipo) === teamSlug) || null;
}

export function getClubDataByTeamName(teamName) {
  const compactTeamName = compactMatchText(teamName);
  const aliasSlug = TEAM_ALIASES[compactTeamName];
  const teamSlug = slugifyTeamName(teamName);
  const compactTeamSlug = compactMatchText(teamSlug);

  const club =
    clubesData.find((item) => item.slug === aliasSlug) ||
    clubesData.find((item) => item.slug === teamSlug) ||
    clubesData.find((item) => compactMatchText(item.slug) === compactTeamSlug) ||
    clubesData.find((item) => compactMatchText(item.nombre) === compactTeamName) ||
    clubesData.find((item) => compactMatchText(item.nombre).includes(compactTeamName)) ||
    clubesData.find((item) => compactTeamName.includes(compactMatchText(item.nombre))) ||
    null;

  if (!club) {
    return null;
  }

  const { url, ...clubWithoutUrl } = club;
  return clubWithoutUrl;
}
