import { Repositories } from '@/shared/api/repositories';
import Image from 'next/image';
import { use } from 'react';

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
    const planta = use(getPlanta(plantaId));
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
async function getPlanta(plantaId: number) {
    try {
        return (await Repositories.plantas.getPlanta(plantaId)).data;
    } catch {
        return null;
    }
}
