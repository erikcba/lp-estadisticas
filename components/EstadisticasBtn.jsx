import { useState } from 'react';

const EstadisticasDesplegables = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center hover:cursor-pointer justify-between p-4 rounded-xl border transition-all duration-300 ${
          isOpen 
            ? 'bg-primary-container text-on-primary-container border-primary/30 shadow-md' 
            : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container-high'
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <span className="truncate text-left font-headline text-base font-bold sm:text-lg">
            Estadísticas personales
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 uppercase tracking-tighter">
            Top 5
          </span>
        </div>
        
        {/* SVG Manual de un Chevron */}
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* Contenido con animación de altura */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EstadisticasDesplegables;