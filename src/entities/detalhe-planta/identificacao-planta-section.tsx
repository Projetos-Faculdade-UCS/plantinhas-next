import { Planta } from '@/shared/types/planta.d';
import Link from 'next/link';

interface IdentificacaoPlantaSectionProps {
    planta: Planta;
}

export function IdentificacaoPlantaSection({
    planta,
}: IdentificacaoPlantaSectionProps) {
    return (
        <section>
            <h2 className="mb-0 text-3xl font-semibold">{planta.nome}</h2>
            <h4 className="text-muted-foreground text-lg italic">
                {planta.nomeCientifico}
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
                <Link
                    href={`/catalogo/categoria/${planta.categoria.id}`}
                    className="bg-primary rounded-md px-3 py-1 text-sm font-medium text-white"
                >
                    {planta.categoria.nome}
                </Link>
                {planta.subcategorias &&
                    planta.subcategorias.map((sub) => (
                        <Link
                            key={sub.id}
                            href={`/catalogo/?subcategoria=${sub.id}`}
                            className="bg-background rounded-md border border-[#D4D4D4] px-3 py-1 text-sm font-medium"
                        >
                            {sub.nome}
                        </Link>
                    ))}
            </div>
        </section>
    );
}
