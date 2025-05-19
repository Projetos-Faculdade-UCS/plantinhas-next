'use client';
type SearchResultsProps = {
    search: string;
};

import CardPlanta from '@/entities/card-planta';
import { getPlantas } from '@/shared/api/actions/plantas';
import { useQuery } from '@tanstack/react-query';

export function SearchResults({ search }: SearchResultsProps) {
    const query = useQuery({
        queryKey: ['search-plantas', search],
        queryFn: async () => {
            return getPlantas(search, 1);
        },
    });
    return (
        <div className="flex flex-col gap-4">
            <span className="text-muted-foreground text-lg">
                Você pesquisou por &apos;{search}&apos;
            </span>
            {query.isLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                    <i className="ph ph-spinner animate-spin text-3xl" />
                    <span>Carregando...</span>
                </div>
            ) : query.isError ? (
                <div className="flex h-full w-full items-center justify-center">
                    <span>Erro ao carregar plantas</span>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {query.data?.itens.map((planta) => (
                        <CardPlanta key={planta.id} planta={planta} />
                    ))}
                </div>
            )}
        </div>
    );
}
