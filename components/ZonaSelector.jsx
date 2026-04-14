const ZonaSelector = ({ zonaActiva, setZonaActiva }) => {
  return (
    <div className="flex bg-surface-container-lowest p-1 border gap-1 border-outline-variant w-fit mx-4">
      <button
        onClick={() => setZonaActiva('A')}
        className={`px-8 py-2 font-headline hover:cursor-pointer transition-all duration-300 ${
          zonaActiva === 'A'
            ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
            : 'text-on-surface  hover:bg-surface-variant'
        }`}
      >
        Zona A
      </button>
      <button
        onClick={() => setZonaActiva('B')}
        className={`px-8 py-2 font-headline hover:cursor-pointer transition-all duration-300 ${
          zonaActiva === 'B'
            ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
            : 'text-on-surface hover:bg-surface-variant'
        }`}
      >
        Zona B
      </button>
    </div>
  );
};

export default ZonaSelector;