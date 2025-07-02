import { PlantaPreview } from '@/shared/types/planta';
import { Itim } from 'next/font/google';
import Link from 'next/link';
import { FallbackImage } from '../imagem/fallback-image';
import styles from './animation.module.scss';
import { Ondulacao } from './ondulacao';
const itim = Itim({
    subsets: ['latin'],
    weight: '400',
});

type CardPlantaProps = {
    planta: PlantaPreview;
    deactivated?: boolean;
};
export default function CardPlanta({ planta, deactivated }: CardPlantaProps) {
    return (
        <Link
            href={`/catalogo/planta/${planta.id}`}
            className={`relative w-[9.5rem] shrink-0 ${styles.jumpOnHover}`}
        >
            <div className={`flex h-full flex-col`}>
                <div className="h-8"></div>
                <Ondulacao />
                <div className="bg-card h-8 border-x"></div>
                <div className="bg-card flex flex-col gap-2 border-x pb-2">
                    <span
                        className={`z-[1] w-full text-center text-xl ${itim.className}`}
                    >
                        {planta.nome}
                    </span>
                </div>
                <div
                    className={`flex h-9 shrink-0 items-center justify-between rounded-b-md border-x border-b px-4 transition duration-300 ${styles.cardFooter} ${deactivated ? 'bg-muted-foreground border' : 'border-border-primary to-primary bg-linear-to-t from-[#37652B]'}`}
                >
                    <span className="text-primary-foreground">
                        {planta.dificuldade.label}
                    </span>

                    <span className="text-primary-foreground">
                        {planta.dificuldade.value.toFixed(1).replace('.', ',')}
                    </span>
                </div>
            </div>
            <div className="absolute top-0 left-0 z-[1] flex w-full flex-col items-center justify-center">
                <FallbackImage
                    key={planta.id}
                    src={planta.foto!}
                    alt={planta.nome || 'Sem imagem'}
                    width={288}
                    height={288}
                    className={`h-[120px] w-fit transition duration-300 ${deactivated ? 'grayscale' : ''}`}
                />
            </div>
            <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                <div className="bg-foreground h-20 w-20 rounded-full opacity-40 blur-lg"></div>
            </div>
        </Link>
    );
}
