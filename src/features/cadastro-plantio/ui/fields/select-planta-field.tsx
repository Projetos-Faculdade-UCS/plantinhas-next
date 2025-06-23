import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';
import { Tile } from '@/shared/ui/tile';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { searchPlantasAction } from '../../lib/plantio.action';

interface PlantaFieldProps {
    control: Control<NewPlantioForm>;
    disabled: boolean;
}

export function SelectPlantaField({ control, disabled }: PlantaFieldProps) {
    const [search, setSearch] = useState<string>('');
    const { data: plantas = [], isLoading } = useQuery({
        queryKey: ['plantas', search],
        queryFn: async () => {
            const response = await searchPlantasAction(search);
            if (response.error) {
                throw new Error('Erro ao carregar plantas');
            }
            return response.data?.itens || [];
        },
        refetchOnWindowFocus: false,
    });

    return (
        <FormField
            control={control}
            name="plantaId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Planta</FormLabel>
                    <Select
                        onValueChange={(value: string) => {
                            field.onChange(value);
                        }}
                        value={field.value || ''}
                        disabled={disabled && plantas.length === 0}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione uma planta" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <Input
                                type="text"
                                className="mb-2"
                                placeholder="Buscar planta..."
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                disabled={disabled}
                            />
                            {isLoading && (
                                <SelectItem value="loading" disabled>
                                    Carregando plantas...
                                </SelectItem>
                            )}
                            {!isLoading && plantas.length === 0 && (
                                <SelectItem value="no-plants" disabled>
                                    Nenhuma planta encontrada.
                                </SelectItem>
                            )}
                            {plantas.map((planta) => (
                                <SelectItem
                                    key={planta.id}
                                    value={String(planta.id)}
                                >
                                    <Tile
                                        title={planta.nome}
                                        value={planta.dificuldade.label}
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
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
