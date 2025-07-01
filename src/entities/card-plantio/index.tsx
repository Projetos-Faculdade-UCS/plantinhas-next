import { Repositories } from '@/shared/api/repositories';
import { itim } from '@/shared/lib/utils';
import { PlantioPreview } from '@/shared/types/plantio';
import Link from 'next/link';
import { use } from 'react';
import animationStyles from '../card-planta/animation.module.scss';
import { Ondulacao } from '../card-planta/ondulacao';
import { ImagemPlanta } from '../imgem-planta';
import { CardPlantioIncators } from './card-plantio-indicators';
import { WarningBubble } from './warning-bubble';

type CardPlantioProps = {
    plantio: PlantioPreview;
};

export function CardPlantio({ plantio }: CardPlantioProps) {
    return (
        <Link
            href={`/jardim/plantio/${plantio.id}`}
            className={`relative w-[10.5rem] shrink-0 sm:w-[13.5rem] ${animationStyles.jumpOnHover}`}
        >
            <div className={`flex h-full flex-col`}>
                <div className="h-8"></div>
                <Ondulacao />
                <div className="bg-card h-8 border-x"></div>
                <div className="bg-card flex flex-col gap-2 border-x pb-2">
                    <NomePlanta plantaId={plantio.plantaId} />
                </div>
                <CardPlantioIncators plantio={plantio} />
            </div>
            <div className="absolute top-0 left-0 z-[1] flex w-full justify-center">
                <ImagemPlanta
                    plantaId={plantio.plantaId}
                    width={1000}
                    height={1000}
                    className={`h-[120px] w-fit object-contain transition duration-300`}
                />
            </div>
            <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                <div className="bg-foreground h-20 w-20 rounded-full opacity-40 blur-lg"></div>
            </div>
            <WarningBubble
                situacao={plantio.situacao.value}
                sede={plantio.sede.value}
                saude={plantio.saude.value}
            />
        </Link>
    );
}

function NomePlanta({ plantaId }: { plantaId: number }) {
    try {
        const { data: planta } = use(Repositories.plantas.getPlanta(plantaId));
        return (
            <span
                className={`z-[1] w-full text-center text-xl ${itim.className}`}
            >
                {planta.nome}
            </span>
        );
    } catch {
        return (
            <span
                className={`text-muted-foreground z-[1] w-full text-center text-xl ${itim.className}`}
            >
                Erro ao carregar
            </span>
        );
    }
}
