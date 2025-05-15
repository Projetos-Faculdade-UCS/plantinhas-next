import { PlantaPreview } from '@/shared/types/planta';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

type CardPlantaProps = {
    planta: PlantaPreview;
};
export default function CardPlanta({ planta }: CardPlantaProps) {
    return (
        <Link
            href={`/catalogo/planta/${planta.id}`}
            className="relative h-52 w-52 shrink-0"
        >
            <div className={`${styles.waveCard} flex flex-col`}>
                <div className="flex grow flex-col gap-2 bg-red-800">
                    <div className="h-[120px] w-full"></div>
                    <span className="w-full text-center text-xl">
                        {planta.nome}
                    </span>
                </div>
                <div className="bg-primary flex h-10 shrink-0 items-center justify-between px-4">
                    <span className="text-primary-foreground">
                        {planta.dificuldade.label}
                    </span>

                    <span className="text-primary-foreground">
                        {planta.dificuldade.value.toFixed(1).replace('.', ',')}
                    </span>
                </div>
            </div>
            <div className="absolute top-0 left-0 flex h-full w-full">
                <Image
                    src={planta.foto || '/assets/plantas/girassol.png'}
                    alt={planta.nome || 'Sem imagem'}
                    width={1000}
                    height={1000}
                    className="h-[120px] object-contain"
                />
            </div>
        </Link>
    );
}
