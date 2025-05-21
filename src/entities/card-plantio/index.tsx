import { itim } from '@/shared/lib/utils';
import { PlantioPreview } from '@/shared/types/plantio';
import Link from 'next/link';
import styles from '../card-planta/animation.module.scss';
import { Ondulacao } from '../card-planta/ondulacao';

type CardPlantioProps = {
    plantio: PlantioPreview;
};

export function CardPlantio({ plantio }: CardPlantioProps) {
    return (
        <Link
            href={`/jardim/plantio/${plantio.id}`}
            className={`relative w-[12rem] shrink-0 ${styles.jumpOnHover}`}
        >
            <div className={`flex h-full flex-col`}>
                <div className="h-8"></div>
                <Ondulacao />
                <div className="bg-card h-8 border-x"></div>
                <div className="bg-card flex flex-col gap-2 border-x pb-2">
                    <span
                        className={`z-[1] w-full text-center text-xl ${itim.className}`}
                    >
                        {plantio.planta.nome}
                    </span>
                </div>
                <div
                    className={`bg-primary flex h-9 shrink-0 items-center rounded-b-md border-x border-b px-4 transition duration-300 ${styles.cardFooter}`}
                >
                    <span className="text-primary-foreground">
                        {plantio.situacao}
                    </span>
                </div>
            </div>
        </Link>
    );
}
