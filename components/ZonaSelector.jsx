const ZonaSelector = ({ zonaActiva, setZonaActiva }) => {
  return (
    <div className="mx-0 flex w-full max-w-md gap-1 rounded-md border border-outline-variant bg-surface-container-lowest p-1 lg:mx-4 lg:w-fit lg:max-w-none">
      <button
        onClick={() => setZonaActiva('A')}
        className={`flex-1 rounded-l-sm px-4 py-2 font-headline transition-all duration-300 hover:cursor-pointer sm:px-6 lg:flex-none lg:px-8 ${
          zonaActiva === 'A'
            ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
            : 'text-on-surface  hover:bg-surface-variant'
        }`}
      >
        Zona A
      </button>
      <button
        onClick={() => setZonaActiva('B')}
        className={`flex-1 rounded-r-sm px-4 py-2 font-headline transition-all duration-300 hover:cursor-pointer sm:px-6 lg:flex-none lg:px-8 ${
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