import { FallbackImage } from '@/entities/imagem/fallback-image';
import { NewPlantioForm } from '@/features/cadastro-plantio/lib/cadastro-plantio.schema';
import { PlantaPreview } from '@/shared/types/planta';
import { FormField } from '@/shared/ui/form';
import { Itim } from 'next/font/google';
import { Control } from 'react-hook-form';
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
        <div className="flex h-full items-center justify-center">
            {planta ? (
                <div className="flex flex-col items-center justify-center space-y-2 px-4 sm:px-8 md:space-x-2">
                    <div className="relative">
                        <FallbackImage
                            key={planta.id}
                            fallbackMessage="Imagem indisponível"
                            src={planta.foto!}
                            className="z-[1]"
                            alt={planta.nome}
                            width={128}
                            height={128}
                        />
                        <span className="bg-foreground absolute inset-0 z-[0] mx-4 mt-10 rounded-full opacity-40 blur-lg"></span>
                    </div>
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
                    <h2
                        className={`${itim.className} bg-muted mx-auto w-full rounded-md border py-0 text-center text-lg shadow-sm`}
                    >
                        {planta.nome}
                    </h2>
                    <QuantidadeField control={control} disabled={isBusy} />
                </div>
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
