import { PlantaPreview } from '@/shared/types/planta';
import { Itim } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Ondulacao } from './ondulacao';

const itim = Itim({
    subsets: ['latin'],
    weight: '400',
});

type CardPlantaProps = {
    planta: PlantaPreview;
};
export default function CardPlanta({ planta }: CardPlantaProps) {
    return (
        <Link
            href={`/catalogo/planta/${planta.id}`}
            className="relative h-52 w-52 shrink-0 transition-all duration-200 hover:scale-105"
        >
            <div className={`flex h-full flex-col`}>
                <Ondulacao />
                <div className="bg-card grow border-x"></div>
                <div className="bg-card flex flex-col gap-2 border-x py-4">
                    <span
                        className={`z-[1] w-full text-center text-xl ${itim.className}`}
                    >
                        {planta.nome}
                    </span>
                </div>
                <div className="bg-primary border-primary flex h-10 shrink-0 items-center justify-between rounded-b-md border-x border-b px-4">
                    <span className="text-primary-foreground">
                        {planta.dificuldade.label}
                    </span>

                    <span className="text-primary-foreground">
                        {planta.dificuldade.value.toFixed(1).replace('.', ',')}
                    </span>
                </div>
            </div>
            <div className="absolute top-0 left-0 z-[1] flex w-full justify-center">
                <Image
                    src={planta.foto || '/assets/plantas/girassol.png'}
                    alt={planta.nome || 'Sem imagem'}
                    width={1000}
                    height={1000}
                    className="h-[120px] w-full object-contain"
                />
            </div>
            <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                <div className="bg-foreground h-20 w-20 rounded-full opacity-50 blur-lg"></div>
            </div>
        </Link>
    );
}
