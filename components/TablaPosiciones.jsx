import Image from 'next/image'

const TablaPosiciones = ({ titulo, equipos }) => {
  return (
    <div className="overflow-x-auto bg-surface-container-low border-outline-variant mb-8">
      {/* Título dinámico con tus colores de Material 3 */}
      <h2 className='bg-surface-container text-on-background p-3 border-l-4 border-primary font-headline text-xl'>
        {titulo}
      </h2>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-high text-on-surface">
            <th className="p-3 font-headline">Pos</th>
            <th className="p-3 font-headline">Equipo</th>
            <th className="p-3 font-headline text-center">PJ</th>
            <th className="p-3 font-headline text-center">DG</th>
            <th className="p-3 font-headline text-center bg-primary-container text-on-primary-container">Pts</th>
          </tr>
        </thead>
        <tbody className="text-on-surface-variant font-body">
          {equipos.map((team) => (
            <tr key={team.equipo} className="hover:bg-surface-bright transition-colors border-b border-outline-variant/30">
              <td className="p-3 font-bold">{team.posicion}</td>
              <td className="p-3 flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image
                    src={team.escudo}
                    alt={`Escudo de ${team.equipo}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="font-medium text-on-surface">{team.equipo}</span>
              </td>
              <td className="p-3 text-center">{team.pj}</td>
              <td className={`p-3 text-center font-medium ${team.dg > 0 ? 'text-secondary-fixed' : 'text-error'}`}>
                {team.dg > 0 ? `+${team.dg}` : team.dg}
              </td>
              <td className="p-3 text-center font-bold text-on-surface bg-outline-variant/30 ">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaPosiciones;