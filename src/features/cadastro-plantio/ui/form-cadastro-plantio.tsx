'use client';

import {
    CadastroPlantioSchema,
    NewPlantioForm,
} from '@/features/cadastro-plantio/lib/cadastro-plantio.schema';
import { Button } from '@/shared/ui/button';
import { Form } from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

// Importando os novos componentes de campo
import { InformacoesAdicionaisField } from './fields/informacoes-adicionais-field';
import { OndePlantarField } from './fields/onde-plantar-field';

// Importando os novos hooks
import { usePlantioAi } from '@/features/show-plantio-gerado/lib/context';
import { gerarPlantio } from '@/shared/api/actions/ai';
import { formatPlantioForm } from '../lib/format-plantio-form';
import { ComoPlantarField } from './fields/como-plantar-field';
import { Pokedex } from './select-planta/pokedex';

export function FormCadastroPlantio() {
    const searchParams = useSearchParams();
    const { openWith } = usePlantioAi();
    const [isFormBusy, startAiTransition] = useTransition();
    const [aiError, setAiError] = useState<string | null>(null);

    const form = useForm<NewPlantioForm>({
        resolver: zodResolver(CadastroPlantioSchema),
        defaultValues: {
            plantaId: Number(searchParams.get('plantaId')) || undefined,
            quantidade: 1,
            informacoesAdicionais: '',
            ambiente: undefined,
            sistemaCultivo: undefined,
        },
        mode: 'onSubmit',
    });

    async function onSubmit(data: NewPlantioForm) {
        // console.log('Dados do formulário:', data);
        try {
            startAiTransition(async () => {
                const iaInputPayload = await formatPlantioForm(data);
                // console.log('Payload formatado para IA:', iaInputPayload);
                const resultIA = await gerarPlantio(iaInputPayload);

                if (resultIA.error) {
                    setAiError(resultIA.error);
                }
                if (resultIA.data) {
                    openWith(resultIA.data, data.plantaId);
                }
            });
        } catch {
            form.setError('root', {
                type: 'manual',
                message: 'Erro ao criar plantio.',
            });
        }
    }
    const formErrors = form.formState.errors;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
                    <div className="space-y-4 lg:col-span-2">
                        <Pokedex control={form.control} isBusy={isFormBusy} />
                        <InformacoesAdicionaisField
                            control={form.control}
                            disabled={isFormBusy}
                        />
                    </div>

                    <div className="space-y-4 lg:col-span-2">
                        <OndePlantarField
                            control={form.control}
                            isBusy={isFormBusy}
                        />
                        <ComoPlantarField
                            control={form.control}
                            isBusy={isFormBusy}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {aiError && (
                        <div className="text-destructive text-sm">
                            Erro ao gerar plantio: {aiError}
                        </div>
                    )}
                    {Object.keys(formErrors).length > 0 && (
                        <div className="text-destructive text-sm">
                            O formulário contém erros
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={isFormBusy}
                        className="w-full cursor-pointer text-base"
                    >
                        {isFormBusy ? (
                            <span className="animate-spin">
                                <i className="ph ph-spinner text-lg" />
                            </span>
                        ) : (
                            <>
                                <span>Plantar com IA</span>
                                <i className="ph ph-sparkle text-lg" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
