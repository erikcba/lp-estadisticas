import data from '../app/tabla.json'
import Image from 'next/image'

const TablaPosiciones = () => {
    return (
        <div className="overflow-x-auto bg-surface-container-low ">
            <h1 className='bg-surface-container text-on-background p-3 border-l-2 border-green-400'>
                Zona A
            </h1>
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
                    {data.posiciones.map((team) => (
                        <tr key={team.equipo} className=" hover:bg-surface-bright transition-colors">
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
                            <td className={`p-3 text-center ${team.dg > 0 ? 'text-secondary-fixed' : 'text-error'}`}>
                                {team.dg > 0 ? `+${team.dg}` : team.dg}
                            </td>
                            <td className="p-3 text-center font-bold text-on-surface">{team.pts}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablaPosiciones