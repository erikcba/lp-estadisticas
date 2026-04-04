import Image from "next/image";
import TablaPosiciones from "@/components/TablaPosiciones";
import ResultadosFecha from "@/components/ResultadosFecha";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center font-sans gap-5 pt-5">
      <div className="flex flex-col">
        <p className="text-tertiary uppercase">Liga profesional</p>
        <h1 className="text-secondary font-headline font-semibold text-4xl ">Tabla de posiciones</h1>
      </div>
      <div className="grid grid-cols-3 w-full gap-4">
        <div className="col-span-2">
          <TablaPosiciones />
        </div>
        <div>
          <ResultadosFecha />
        </div>
      </div>
    </div>
  );
}
