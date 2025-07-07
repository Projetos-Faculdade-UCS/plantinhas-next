'use client';

import CardPlanta from '@/entities/card-planta';
import { CardPlantaSkeleton } from '@/entities/card-planta/card-planta-skeleton';
import { getPlantasPorCategoria } from '@/shared/api/actions/plantas';
import { cleanPaginatedPlantas } from '@/shared/lib/clean-paginated-query';
import { useVerticalScroll } from '@/shared/lib/use-vertical-croll';
import { PlantaPreview } from '@/shared/types/planta';
import { PagedResponse } from '@/shared/types/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export function ListaPlantasCategoria() {
    const params = useParams();
    const categoriaId = Number(params.categoriaId);

    const { data, hasNextPage, fetchNextPage, error, isLoading } =
        useInfiniteQuery<PagedResponse<PlantaPreview>>({
            queryKey: ['plantas-categoria', categoriaId],
            initialPageParam: 1,
            queryFn: async ({ pageParam = 1 }) => {
                const resp = await getPlantasPorCategoria(
                    categoriaId,
                    pageParam as number,
                    10,
                );
                if (resp.error || resp.data === undefined) {
                    throw new Error(resp.error);
                }
                return resp.data;
            },
            getNextPageParam: (lastPage) => {
                if (lastPage.paginaAtual < lastPage.ultimaPagina) {
                    return lastPage.paginaAtual + 1;
                }
                return undefined;
            },
            throwOnError: false,
        });
    const plantas = cleanPaginatedPlantas(data);
    const { triggerScrollRef } = useVerticalScroll({
        onScrollEnd: () => {
            if (hasNextPage) fetchNextPage();
        },
    });
    if (error) {
        return (
            <div className="text-destructive">
                Ocorreu um erro ao carregar as plantas: {error.message}
            </div>
        );
    }
    return (
        <div className="flex flex-wrap gap-8">
            {plantas.map((planta) => (
                <CardPlanta key={planta.id} planta={planta} />
            ))}
            {plantas.length === 0 && !isLoading && (
                <div className="text-muted-foreground">
                    Nenhuma planta encontrada nesta categoria.
                </div>
            )}
            {isLoading &&
                Array.from({ length: 10 }).map((_, index) => (
                    <CardPlantaSkeleton key={index} />
                ))}
            <div ref={triggerScrollRef}></div>
        </div>
    );
}
