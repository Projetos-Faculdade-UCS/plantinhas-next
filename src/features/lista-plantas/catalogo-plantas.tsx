import CardPlanta from '@/entities/card-planta';
import { PrateleiraPlantas } from '@/entities/prateleira-plantas';
import { Repositories } from '@/shared/api/repositories';
import Link from 'next/link';

export async function CatalogoPlantas() {
    const catalogo = await Repositories.plantas.getCatalogo();
    return (
        <div className="flex flex-col gap-4">
            {catalogo.data.items.map((categoria) => (
                <div key={categoria.id} className="flex w-full flex-col gap-2">
                    <Link
                        href={`/catalogo/categoria/${categoria.id}`}
                        className="text-muted-foreground flex items-center gap-2 px-2"
                    >
                        <h2 className={`text font-medium`}>{categoria.nome}</h2>
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
    );
}
