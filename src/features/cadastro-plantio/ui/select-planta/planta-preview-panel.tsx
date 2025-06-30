import { PlantaPreview } from '@/shared/types/planta';
import { Itim } from 'next/font/google';
import Image from 'next/image';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { QuantidadeField } from '../fields/quantidade-field';

const itim = Itim({
    subsets: ['latin'],
    weight: '400',
});

export function PlantaPreviewPanel({
    planta,
    control,
    isBusy = false,
}: {
    planta: PlantaPreview | null;
    control: Control<NewPlantioForm>;
    isBusy?: boolean;
}) {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-2 px-4">
            {planta ? (
                <>
                    <Image
                        src={planta.foto!}
                        alt={planta.nome}
                        width={128}
                        height={128}
                    />
                    <h2 className={`${itim.className} text-lg`}>
                        {planta.nome}
                    </h2>
                    <QuantidadeField control={control} disabled={isBusy} />
                </>
            ) : (
                <p className="text-muted-foreground my-auto text-center text-sm">
                    Nenhuma planta selecionada
                </p>
            )}
        </div>
    );
}
