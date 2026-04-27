import Image from 'next/image'
import Link from 'next/link'
import { slugifyTeamName } from '@/libs/equipos'

const TablaPosiciones = ({ titulo, equipos, zonaKey }) => {
  // Función auxiliar para los colores de los círculos de forma
  const getFormaColor = (resultado) => {
    switch (resultado) {
      case 'V': return 'bg-secondary-fixed text-on-secondary-fixed'; // Verde/Victoria
      case 'E': return 'bg-outline-variant text-on-surface-variant'; // Gris/Empate
      case 'D': return 'bg-error text-on-error'; // Rojo/Derrota
      default: return 'bg-surface-variant';
    }
  }

  return (
    <div className="overflow-x-auto bg-surface-container-low rounded-md shadow-md">
      <h2 className="border-l-4 border-primary bg-surface-container p-3 font-headline text-lg text-on-background sm:text-xl">
        {titulo}
      </h2>

      <table className="w-full min-w-[520px] border-collapse text-left text-sm sm:text-base">
        <thead>
          <tr className="bg-surface-container-high text-on-surface">
            <th className="p-2 font-headline sm:p-3">Pos</th>
            <th className="p-2 font-headline sm:p-3">Equipo</th>
            <th className="p-2 text-center font-headline sm:p-3">PJ</th>
            <th className="p-2 text-center font-headline sm:p-3">DG</th>
            <th className="p-2 text-center font-headline sm:p-3">Forma</th>
            <th className="bg-primary-container p-2 text-center font-headline text-on-primary-container sm:p-3">Pts</th>
          </tr>
        </thead>
        <tbody className="font-body text-on-surface-variant">
          {equipos.map((team) => (
            <tr key={team.equipo} className="border-b border-outline-variant/30 transition-colors hover:bg-surface-bright">
              <td className="p-2 font-bold sm:p-3">{team.posicion}</td>
              <td className="flex items-center gap-2 p-2 sm:gap-3 sm:p-3">
                <Link
                  href={`/equipos/${zonaKey}/${slugifyTeamName(team.equipo)}`}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <div className="relative h-7 w-7 shrink-0 sm:h-8 sm:w-8">
                    <Image
                      src={team.escudo}
                      alt={`Escudo de ${team.equipo}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="max-w-[140px] truncate font-medium text-on-surface hover:text-primary sm:max-w-none sm:whitespace-normal">
                    {team.equipo}
                  </span>
                </Link>
              </td>
              <td className="p-2 text-center sm:p-3">{team.pj}</td>
              <td className={`p-2 text-center font-medium sm:p-3 ${team.dg > 0 ? "text-secondary-fixed" : "text-error"}`}>
                {team.dg > 0 ? `+${team.dg}` : team.dg}
              </td>

              {/* Nueva celda de Forma */}
              <td className="p-2 sm:p-3">
                <div className="flex justify-center gap-0.5 sm:gap-1">
                  {team.forma?.map((resultado, index) => (
                    <span
                      key={index}
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold sm:h-6 sm:w-6 sm:text-[10px] ${getFormaColor(resultado)}`}
                      title={resultado === 'V' ? 'Victoria' : resultado === 'E' ? 'Empate' : 'Derrota'}
                    >
                      {resultado}
                    </span>
                  ))}
                </div>
              </td>

              <td className="bg-surface-container-high/50 p-2 text-center font-bold text-on-surface sm:p-3">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaPosiciones;