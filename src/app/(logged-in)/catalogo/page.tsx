import CardPlanta from '@/entities/card-planta';
import { PrateleiraPlantas } from '@/features/lista-plantas/prateleira-plantas';
import { PlantaRepository } from '@/shared/api/repositories/planta-repository';
import Link from 'next/link';

export default async function CatalogoPlantasPage() {
    const catalogo = await new PlantaRepository().getCatalogo();
    return (
        <div className="flex h-full w-full flex-col gap-4 px-2 py-2 lg:px-8 lg:py-4">
            <div className="text-primary flex items-center gap-2 px-2">
                <i className="ph ph-book-bookmark text-3xl" />
                <p className="text-2xl font-medium">Catálogo de Plantas</p>
            </div>
            <div className="flex flex-col gap-4">
                {catalogo.data.items.map((categoria) => (
                    <div
                        key={categoria.id}
                        className="flex w-full flex-col gap-2"
                    >
                        <Link
                            href={`/catalogo/categoria/${categoria.id}`}
                            className="text-muted-foreground flex items-center gap-2 px-2"
                        >
                            <h2 className={`text-xl font-medium`}>
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
