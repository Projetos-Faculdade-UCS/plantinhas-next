import CardPlanta from '@/entities/card-planta';
import { Repositories } from '@/shared/api/repositories';
import Link from 'next/link';

export default async function PlantasPorCategoriaPage({
    params,
}: {
    params: Promise<{ categoriaId: string }>;
}) {
    const categoriaId = Number((await params).categoriaId);
    const plantaRepository = Repositories.plantas;
    const categoria = await plantaRepository.getCategoria(categoriaId);
    const plantas = await plantaRepository.getPlantasPorCategoria(
        categoriaId,
        1,
    );

    return (
        <div className="flex h-full w-full flex-col gap-4 px-8 py-4">
            <div className="flex items-center gap-2">
                <Link
                    href="/catalogo"
                    className="text-primary flex items-center gap-2"
                >
                    <i className="ph ph-book-bookmark text-3xl" />
                    <p className="text-2xl font-medium">Catálogo de Plantas</p>
                </Link>
                <div className="text-muted-foreground flex items-center gap-2">
                    <i className="ph ph-caret-right text-xl" />
                    <p className="text-xl font-medium">{categoria.data.nome}</p>
                </div>
            </div>
            <p className="text-muted-foreground">{categoria.data.descricao}</p>
            <div className="flex flex-wrap gap-8">
                {plantas.data.itens.map((planta) => (
                    <CardPlanta key={planta.id} planta={planta} />
                ))}
            </div>
        </div>
    );
}
