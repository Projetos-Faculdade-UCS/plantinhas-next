import { cn } from '@/shared/lib/utils';
import { PlantioPreview } from '@/shared/types/plantio';
import Link from 'next/link';
import animationStyles from '../card-planta/animation.module.scss';
import { Ondulacao } from '../card-planta/ondulacao';
import { FetchPlantaImage } from '../imagem/fetch-planta-image';
import { CardPlantioIncators } from './card-plantio-indicators';
import { NomePlanta } from './nome-planta';
import { WarningBubble } from './warning-bubble';

type CardPlantioProps = {
    plantio: PlantioPreview;
    className?: string;
};

export function CardPlantio({ plantio, className }: CardPlantioProps) {
    return (
        <Link
            href={`/jardim/plantio/${plantio.id}`}
            className={cn(
                `relative w-[10.5rem] shrink-0 sm:w-[13.5rem]`,
                animationStyles.jumpOnHover,
                className,
            )}
        >
            <div className={`flex h-full flex-col`}>
                <div className="h-8"></div>
                <Ondulacao />
                <div className="bg-card h-8 border-x"></div>
                <div className="bg-card flex justify-center gap-2 border-x pb-2">
                    <NomePlanta plantaId={plantio.plantaId} />
                </div>
                <CardPlantioIncators plantio={plantio} />
            </div>
            <div className="absolute top-0 left-0 z-[1] flex w-full justify-center">
                <FetchPlantaImage
                    plantaId={plantio.plantaId}
                    width={1000}
                    height={1000}
                    className={`h-[120px] w-fit object-contain transition duration-300`}
                />
            </div>
            <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                <div className="bg-foreground h-20 w-20 rounded-full opacity-40 blur-lg"></div>
            </div>
            <WarningBubble plantioId={plantio.id} />
        </Link>
    );
}
