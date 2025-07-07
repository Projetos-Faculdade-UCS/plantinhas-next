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

    useEffect(() => {
        getPlantaById(plantaId).then((response) => {
            if (response.data) {
                setPlanta(response.data);
            } else {
                setPlanta(null);
            }
        });
    }, [plantaId]);

    return (
        <div className="flex flex-col items-center justify-center">
            <Image
                src={planta?.foto || '/assets/erro-planta.png'}
                alt={planta?.nome || 'Sem imagem'}
                className={className}
                {...props}
            />
            {fallbackMessage && (
                <span className="text-muted-foreground text-xs">
                    {fallbackMessage}
                </span>
            )}
        </div>
    );
}
