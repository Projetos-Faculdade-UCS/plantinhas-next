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
        <div className="flex flex-col gap-4">
            <span className="text-muted-foreground text-lg">
                Você pesquisou por &apos;{search}&apos;
            </span>
            {query.isLoading ? (
                <div className="flex flex-wrap gap-4">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CardPlantaSkeleton key={index} />
                    ))}
                </div>
            ) : query.isError ? (
                <div className="flex h-full w-full items-center justify-center">
                    <span>Erro ao carregar plantas</span>
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
                <div className="flex h-full w-full items-center justify-center">
                    <span>Nenhum resultado encontrado</span>
                </div>
            )}
        </div>
    );
}
