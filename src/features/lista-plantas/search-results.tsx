'use client';

import CardPlanta from '@/entities/card-planta';
import { CardPlantaSkeleton } from '@/entities/card-planta/card-planta-skeleton';
import { getPlantas } from '@/shared/api/actions/plantas';
import { cleanPaginatedPlantas } from '@/shared/lib/clean-paginated-query';
import { useDebounce } from '@/shared/lib/use-debounce';
import { useVerticalScroll } from '@/shared/lib/use-vertical-croll';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

type SearchResultsProps = {
    search: string;
};
export function SearchResults(props: SearchResultsProps) {
    const search = useDebounce(props.search, 500);

    const { data, ...query } = useInfiniteQuery({
        queryKey: ['search-plantas', search],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const resp = await getPlantas(search, pageParam);
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
        placeholderData: (previousData) => previousData,
        throwOnError: false,
    });

    const plantas = useMemo(() => cleanPaginatedPlantas(data), [data]);
    const totalPlantas = data?.pages[0].total || 0;
    const { triggerScrollRef } = useVerticalScroll({
        onScrollEnd: () => {
            if (query.hasNextPage) query.fetchNextPage();
        },
    });

    return (
        <div className="flex h-full flex-col gap-4">
            <span className="text-muted-foreground text-base">
                {query.isPlaceholderData || query.isLoading ? (
                    <span className="animate-pulse">Carregando...</span>
                ) : !!totalPlantas ? (
                    <span>Listando {totalPlantas} plantas</span>
                ) : null}
            </span>
            <div className="flex flex-wrap gap-4">
                {plantas.map((planta) => (
                    <CardPlanta
                        key={planta.id}
                        planta={planta}
                        deactivated={query.isPlaceholderData}
                    />
                ))}
                {(query.isLoading || query.isFetchingNextPage) &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <CardPlantaSkeleton key={index} />
                    ))}
            </div>
            {query.isError && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <i className="ph ph-bug-beetle text-destructive text-3xl" />
                    <span className="text-muted-foreground text-base">
                        Ocorreu um erro ao buscar as plantas
                    </span>
                </div>
            )}
            {plantas.length === 0 && !query.isLoading && (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <i className="ph ph-cactus text-primary text-3xl" />
                    <span className="text-muted-foreground text-base">
                        Nenhum resultado encontrado
                    </span>
                </div>
            )}

            <div ref={triggerScrollRef}></div>
        </div>
    );
}
