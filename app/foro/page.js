import foroData from "@/app/data/foro.json";
import ForoBoard from "@/components/foro/ForoBoard";

export default function ForoPage() {
  return (
    <div className="container mx-auto flex flex-col items-stretch gap-5 px-4 pb-10 pt-4 font-sans sm:px-6 sm:pt-5 lg:px-8 lg:pb-10 lg:pt-5">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-wide text-tertiary sm:text-sm">
          Comunidad
        </p>
        <h1 className="font-headline text-2xl font-semibold text-secondary sm:text-3xl lg:text-4xl">
          Foro
        </h1>
        <p className="max-w-2xl text-sm text-on-surface-variant sm:text-base">
          Tablón general: un solo hilo. De momento es solo lectura.
        </p>
      </div>
      <ForoBoard posts={foroData.posts} />
    </div>
  );
}
