import { Planta } from '@/shared/types/planta.d';
import Link from 'next/link';

interface IdentificacaoPlantaSectionProps {
  planta: Planta;
}

export function IdentificacaoPlantaSection({ planta }: IdentificacaoPlantaSectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-0">{planta.nome}</h2>
      <h4 className="text-lg italic text-muted-foreground">{planta.nomeCientifico}</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        <Link
          href={`/catalogo/?categoria=${planta.categoria.id}`}
          className="rounded-md bg-primary text-white px-3 py-1 text-sm font-medium"
        >
          {planta.categoria.nome}
        </Link>
        {planta.subcategorias && planta.subcategorias.map((sub) => (
          <Link
            key={sub.id}
            href={`/catalogo/?subcategoria=${sub.id}`}
            className="rounded-md bg-background border border-[#D4D4D4] px-3 py-1 text-sm font-medium"
          >
            {sub.nome}
          </Link>
        ))}
      </div>
    </section>
  );
}
