import { SearchInput } from '@/entities/filtros-plantas/search-input';
import { PlantaPreview } from '@/shared/types/planta';
import { Tile } from '@/shared/ui/tile';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { searchPlantasAction } from '../../lib/plantio.action';

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
            const response = await searchPlantasAction(search);
            console.log('Response from searchPlantasAction:', response);
            if (response.error) {
                throw new Error('Erro ao carregar plantas');
            }
            return response.data?.itens || [];
        },
        refetchOnWindowFocus: false,
    });
    return (
        <div className="flex flex-col gap-4">
            <SearchInput
                ref={searchRef}
                className="mx-4 w-48"
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
            <div className="flex h-full flex-col gap-2 overflow-y-scroll px-4">
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
                                planta.foto ? (
                                    <Image
                                        src={planta.foto}
                                        alt={planta.nome}
                                        className="h-8 w-8 rounded"
                                        width={200}
                                        height={200}
                                    />
                                ) : (
                                    <span className="h-8 w-8 rounded bg-gray-200" />
                                )
                            }
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
