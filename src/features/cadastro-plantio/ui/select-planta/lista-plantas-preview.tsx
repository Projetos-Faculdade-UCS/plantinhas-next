import { SearchInput } from '@/entities/filtros-plantas/search-input';
import { FallbackImage } from '@/entities/imagem/fallback-image';
import { getPlantas } from '@/shared/api/actions/plantas';
import { PlantaPreview } from '@/shared/types/planta';
import { Tile } from '@/shared/ui/tile';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import styles from '../fields/styles.module.scss'; // Importando o CSS específico

type ListaPlantasPreviewProps = {
    onSelectPlanta: (planta: PlantaPreview) => void;
};
export function ListaPlantasPreview({
    onSelectPlanta,
}: ListaPlantasPreviewProps) {
    const searchRef = useRef<HTMLInputElement>(null);
    const [search, setSearch] = useState<string>('');
    const { data: plantas = [], isLoading } = useQuery({
        queryKey: ['plantas', search],
        queryFn: async () => {
            const response = await getPlantas(search);
            return response.data?.itens || [];
        },
        refetchOnWindowFocus: false,
    });
    return (
        <div className="flex h-full flex-col gap-4">
            <SearchInput
                ref={searchRef}
                className="mx-4 w-48 shrink-0"
                id="search-plant-in-pokedex"
                onSubmit={() => {
                    setSearch(searchRef.current?.value || '');
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
                className={`mr-2 flex max-h-full flex-col gap-2 ${styles.list} px-4`}
            >
                {plantas.map((planta) => (
                    <button
                        type="button"
                        onClick={() => {
                            onSelectPlanta(planta);
                        }}
                        key={planta.id}
                        className="hover:bg-muted cursor-pointer rounded-md py-1 transition duration-200 hover:scale-105"
                    >
                        <Tile
                            value={planta.nome}
                            leading={
                                <FallbackImage
                                    src={planta.foto}
                                    alt={planta.nome}
                                    className="h-12 w-12 rounded"
                                    width={200}
                                    height={200}
                                />
                            }
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
