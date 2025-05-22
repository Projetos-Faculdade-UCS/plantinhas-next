import { itim } from '@/shared/lib/utils';
import { PlantioPreview } from '@/shared/types/plantio';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../card-planta/animation.module.scss';
import { Ondulacao } from '../card-planta/ondulacao';
import { IndicadorSaude } from './indicador-saude';
import { IndicadorSede } from './indicador-sede';

type CardPlantioProps = {
    plantio: PlantioPreview;
};

export function CardPlantio({ plantio }: CardPlantioProps) {
    return (
        <Link
            href={`/jardim/plantio/${plantio.id}`}
            className={`relative w-[14rem] shrink-0 ${styles.jumpOnHover}`}
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
                    className={`bg-card flex shrink-0 items-center justify-evenly rounded-b-md border-x border-b px-4 pb-2`}
                >
                    <IndicadorSaude saude={plantio.saude} />
                    <IndicadorSede sede={plantio.sede} />
                </div>
                <div className="absolute top-0 left-0 z-[1] flex w-full justify-center">
                    <Image
                        src={
                            plantio.planta.foto ||
                            '/assets/plantas/girassol.png'
                        }
                        alt={plantio.planta.nome || 'Sem imagem'}
                        width={1000}
                        height={1000}
                        className={`h-[120px] w-fit object-contain transition duration-300`}
                    />
                </div>
                <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                    <div className="bg-foreground h-20 w-20 rounded-full opacity-40 blur-lg"></div>
                </div>
            </div>
        </Link>
    );
}
