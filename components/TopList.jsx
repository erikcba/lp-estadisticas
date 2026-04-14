const TopList = ({ titulo, datos, metrica, labelMetrica }) => {
  return (
    <div className="bg-surface-container-low  ">
      <h2 className='bg-surface-container text-on-background p-3 border-l-4 border-primary font-headline text-xl'>
        {titulo}
      </h2>
      <div className="flex flex-col gap-3 px-4 pb-4">
        {datos.slice(0, 5).map((item, index) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-on-surface font-medium">
                {index + 1}. {item.jugador}
              </span>
              <span className="text-on-surface-variant text-xs">
                {item.equipo}
              </span>
            </div>
            <div className="text-right">
              <span className="text-secondary-fixed-dim font-bold text-xl">
                {item[metrica]}
              </span>
              <span className="text-[10px] block text-outline uppercase">
                {labelMetrica}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopList;