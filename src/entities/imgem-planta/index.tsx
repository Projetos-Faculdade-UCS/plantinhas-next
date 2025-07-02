import { Repositories } from '@/shared/api/repositories';
import Image from 'next/image';
import { use } from 'react';

type ImagemPlantaProps = Omit<
    React.ComponentProps<typeof Image>,
    'src' | 'alt'
> & {
    plantaId: number;
};

/**
 * Componente para exibir a imagem de uma planta.
 * Esse componente serve para desacoplar informações de planta em
 * serviços que não dependem do catálogo, como o jardim.
 */
export function ImagemPlanta({
    plantaId,
    className,
    ...props
}: ImagemPlantaProps) {
    try {
        const planta = use(Repositories.plantas.getPlanta(plantaId)).data;
        return (
            <Image
                src={planta.foto || '/assets/plantas/girassol.png'}
                alt={planta.nome || 'Sem imagem'}
                className={className}
                {...props}
            />
        );
    } catch {
        return (
            <Image
                src="/assets/erro-planta.png"
                alt="Imagem padrão de planta"
                className={`${className} grayscale`}
                {...props}
            />
        );
    }
}
