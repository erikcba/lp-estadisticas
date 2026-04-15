import Image from 'next/image'

const TablaPosiciones = ({ titulo, equipos }) => {
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
      <h2 className='bg-surface-container text-on-background p-3 border-l-4 border-primary font-headline text-xl'>
        {titulo}
      </h2>

      <table className="w-full text-left border-collapse ">
        <thead>
          <tr className="bg-surface-container-high text-on-surface">
            <th className="p-3 font-headline">Pos</th>
            <th className="p-3 font-headline">Equipo</th>
            <th className="p-3 font-headline text-center">PJ</th>
            <th className="p-3 font-headline text-center">DG</th>
            <th className="p-3 font-headline text-center">Forma</th>
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

              {/* Nueva celda de Forma */}
              <td className="p-3">
                <div className="flex gap-1 justify-center">
                  {team.forma?.map((resultado, index) => (
                    <span
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${getFormaColor(resultado)}`}
                      title={resultado === 'V' ? 'Victoria' : resultado === 'E' ? 'Empate' : 'Derrota'}
                    >
                      {resultado}
                    </span>
                  ))}
                </div>
              </td>

              <td className="p-3 text-center font-bold text-on-surface bg-surface-container-high/50">{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaPosiciones;