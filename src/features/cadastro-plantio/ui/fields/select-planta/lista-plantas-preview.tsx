import { SearchInput } from '@/entities/filtros-plantas/search-input';
import { FallbackImage } from '@/entities/imagem/fallback-image';
import { getPlantas } from '@/shared/api/actions/plantas';
import { useDebounce } from '@/shared/lib/use-debounce';
import { PlantaPreview } from '@/shared/types/planta';
import { Tile } from '@/shared/ui/tile';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useState } from 'react';
import styles from '../styles.module.scss'; // Importando o CSS específico

type ListaPlantasPreviewProps = {
    onSelectPlanta: (planta: PlantaPreview) => void;
};
export function ListaPlantasPreview({
    onSelectPlanta,
}: ListaPlantasPreviewProps) {
    const searchRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const {
        data = [],
        isLoading,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['plantas', debouncedSearch],
        queryFn: async () => {
            const response = await getPlantas(debouncedSearch);
            return response.data?.itens || [];
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });

    const plantas = useMemo(() => data, [data]);
    return (
        <div className="flex h-full flex-col">
            <SearchInput
                ref={searchRef}
                className="mx-2 max-w-48 shrink-0 sm:mx-4"
                id="search-plant-in-pokedex"
                onChange={(val) => {
                    setSearch(val);
                }}
                placeholder="Buscar planta"
            />
            {isLoading && (
                <div className="text-muted-foreground mx-4 text-center">
                    Carregando plantas...
                </div>
            )}
            {!isLoading && plantas.length === 0 && (
                <div className="text-muted-foreground mx-4 text-center">
                    Nenhuma planta encontrada.
                </div>
            )}
            <div
                className={`mt-1 mr-1 flex max-h-full flex-col gap-2 px-2 pt-1 ${styles.list} transition-opacity duration-300 sm:pr-2 sm:pl-4 ${
                    isPlaceholderData ? 'opacity-50' : 'opacity-100'
                }`}
            >
                {plantas.map((planta) => (
                    <button
                        type="button"
                        onClick={() => {
                            onSelectPlanta(planta);
                        }}
                        key={planta.id}
                        className="bg-card cursor-pointer rounded-md border py-1 transition duration-200 hover:scale-105"
                    >
                        <Tile
                            gap={'8px'}
                            value={planta.nome}
                            leading={
                                <div className="w-12">
                                    <FallbackImage
                                        src={planta.foto}
                                        alt={planta.nome}
                                        className="h-12 w-fit shrink-0 rounded"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            }
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
