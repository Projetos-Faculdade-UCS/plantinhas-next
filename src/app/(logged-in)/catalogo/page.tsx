import CardPlanta from '@/entities/card-planta';
import { PrateleiraPlantas } from '@/features/lista-plantas/prateleira-plantas';
import { PlantaRepository } from '@/shared/api/repositories/planta-repository';
import Link from 'next/link';

export default async function CatalogoPlantasPage() {
    const catalogo = await new PlantaRepository().getCatalogo();
    return (
        <div className="flex h-full w-full flex-col px-8 py-4">
            <div className="text-primary flex items-center gap-2">
                <i className="ph ph-book-bookmark text-3xl" />
                <p className="text-2xl font-medium">Catálogo de Plantas</p>
            </div>
            <div className="flex flex-wrap">
                {catalogo.data.items.map((categoria) => (
                    <div
                        key={categoria.id}
                        className="my-4 flex w-full flex-col gap-2"
                    >
                        <Link
                            href={`/catalogo/categoria/${categoria.id}`}
                            className="text-muted-foreground flex items-center gap-2"
                        >
                            <h2 className="text-xl font-medium">
                                {categoria.nome}
                            </h2>
                            <span>({categoria.quantidadePlantas})</span>
                            <i className="ph ph-caret-right text-xl" />
                        </Link>

                        <PrateleiraPlantas>
                            {categoria.plantas.map((planta) => (
                                <CardPlanta
                                    key={`${categoria.id} ${planta.id}`}
                                    planta={planta}
                                />
                            ))}
                        </PrateleiraPlantas>
                    </div>
                ))}
            </div>
        </div>
    );
}
