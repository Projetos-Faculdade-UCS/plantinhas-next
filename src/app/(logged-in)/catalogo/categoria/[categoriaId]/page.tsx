import { ListaPlantasCategoria } from '@/features/lista-plantas/lista-plantas-categoria';
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

    return (
        <>
            <div className="flex flex-col gap-1">
                <Link
                    href="/catalogo"
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                >
                    <i className="ph ph-arrow-left" />
                    <p className="text-base">Voltar</p>
                </Link>
                <h2 className="text-xl font-medium">{categoria.data.nome}</h2>
                <p className="text-muted-foreground text-base">
                    {categoria.data.descricao}
                </p>
                <ListaPlantasCategoria />
            </div>
        </>
    );
}
