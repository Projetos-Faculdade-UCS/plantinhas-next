'use client';
import { getPlantaById } from '@/shared/api/actions/plantas';
import { PlantaPreview } from '@/shared/types/planta';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ImagemPlantaProps = Omit<
    React.ComponentProps<typeof Image>,
    'src' | 'alt'
> & {
    plantaId: number;
    fallbackMessage?: string;
};

/**
 * Componente para exibir a imagem de uma planta.
 * Esse componente serve para desacoplar informações de planta em
 * serviços que não dependem do catálogo, como o jardim.
 */
export function FetchPlantaImage({
    plantaId,
    fallbackMessage,
    className,
    ...props
}: ImagemPlantaProps) {
    const [planta, setPlanta] = useState<PlantaPreview | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        getPlantaById(plantaId).then((response) => {
            if (response.data) {
                setPlanta(response.data);
            } else {
                setError(true);
            }
        });
    }, [plantaId]);

    return (
        <div className="flex shrink-0 flex-col items-center justify-center">
            <Image
                src={
                    planta?.foto
                        ? planta.foto
                        : error
                          ? '/assets/erro-planta.png'
                          : '/assets/loading.png'
                }
                alt={planta?.nome || 'Sem imagem'}
                className={className}
                {...props}
            />
            {error && fallbackMessage && (
                <span className="text-muted-foreground text-xs">
                    {fallbackMessage}
                </span>
            )}
        </div>
    );
}
