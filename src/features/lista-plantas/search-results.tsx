'use client';
type SearchResultsProps = {
    search: string;
};

import CardPlanta from '@/entities/card-planta';
import { CardPlantaSkeleton } from '@/entities/card-planta/card-planta-skeleton';
import { getPlantas } from '@/shared/api/actions/plantas';
import { useQuery } from '@tanstack/react-query';
import { useDeferredValue } from 'react';

export function SearchResults({ search }: SearchResultsProps) {
    const deferredSearch = useDeferredValue(search);

    const query = useQuery({
        queryKey: ['search-plantas', deferredSearch],
        queryFn: async () => {
            return getPlantas(deferredSearch, 1);
        },
        placeholderData: (previousData) => previousData,
    });

    return (
        <div className="flex h-full flex-col gap-4">
            <span className="text-muted-foreground text-base">
                {query.isPlaceholderData || query.isLoading ? (
                    <span className="animate-pulse">Carregando...</span>
                ) : !!query.data?.total ? (
                    <span>{query.data?.total} plantas encontradas</span>
                ) : null}
            </span>
            {query.isLoading ? (
                <div className="flex flex-wrap gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CardPlantaSkeleton key={index} />
                    ))}
                </div>
            ) : query.isError ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <i className="ph ph-bug-beetle text-destructive text-3xl" />
                    <span className="text-muted-foreground text-base">
                        Ocorreu um erro ao buscar as plantas
                    </span>
                </div>
            ) : query.data?.itens.length ? (
                <div className="flex flex-wrap gap-4">
                    {query.data?.itens.map((planta) => (
                        <CardPlanta
                            key={planta.id}
                            planta={planta}
                            deactivated={query.isPlaceholderData}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <i className="ph ph-cactus text-primary text-3xl" />
                    <span className="text-muted-foreground text-base">
                        Nenhum resultado encontrado
                    </span>
                </div>
            )}
        </div>
    );
}
