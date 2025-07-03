import { FallbackImage } from '@/entities/imagem/fallback-image';
import { PlantaPreview } from '@/shared/types/planta';
import { FormField } from '@/shared/ui/form';
import { Itim } from 'next/font/google';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import { QuantidadeField } from './quantidade-field';

const itim = Itim({
    subsets: ['latin'],
    weight: '400',
});

export function PlantaPreviewPainel({
    planta,
    control,
    isBusy = false,
    hasError = false,
}: {
    planta: PlantaPreview | null;
    control: Control<NewPlantioForm>;
    isBusy?: boolean;
    hasError?: boolean;
}) {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-2 px-4">
            {planta ? (
                <>
                    <FallbackImage
                        key={planta.id}
                        fallbackMessage="Imagem indisponível"
                        src={planta.foto!}
                        alt={planta.nome}
                        width={128}
                        height={128}
                    />
                    <h2
                        className={`${itim.className} bg-muted w-full rounded-md py-0 text-center text-lg`}
                    >
                        {planta.nome}
                    </h2>
                    <FormField
                        control={control}
                        name="plantaId"
                        render={({ field }) => (
                            <>
                                <input
                                    type="hidden"
                                    {...field}
                                    disabled={isBusy}
                                />
                            </>
                        )}
                    />
                    <QuantidadeField control={control} disabled={isBusy} />
                </>
            ) : hasError ? (
                <p className="text-destructive text-center text-sm">
                    Selecione uma planta para continuar
                </p>
            ) : (
                <p className="text-muted-foreground my-auto text-center text-sm">
                    Nenhuma planta selecionada
                </p>
            )}
        </div>
    );
}
