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
import { FieldErrors, useForm } from 'react-hook-form';
import { IAEntradaPlantio } from '../lib/ia-api.schema';
import { processarPlantioIAAction } from '../lib/plantio.action';

// Importando os novos componentes de campo
import { InformacoesAdicionaisField } from './fields/informacoes-adicionais-field';
import { OndePlantarField } from './fields/onde-plantar-field';
import { SubmittedJsonDisplay } from './SubmittedJsonDisplay';

// Importando os novos hooks
import { formatPlantioForm } from '../lib/format-plantio-form';
import { ComoPlantarField } from './fields/como-plantar-field';
import { Pokedex } from './select-planta/pokedex';

export function CadastroPlantioForm() {
    const searchParams = useSearchParams();
    const [isLoadingAi, startAiTransition] = useTransition();
    const [aiResponse, setAiResponse] = useState<string | null>(null);

    const form = useForm<NewPlantioForm>({
        resolver: zodResolver(CadastroPlantioSchema),
        defaultValues: {
            plantaId: Number(searchParams.get('plantaId')) || undefined,
            quantidade: 1,
            informacoesAdicionais: '',
            ambiente: { local: undefined, condicao: 'externo' },
            sistemaCultivo: undefined,
        },
        mode: 'onSubmit',
    });

    async function onSubmit(data: NewPlantioForm) {
        console.log('Dados do formulário:', data);
        setAiResponse(null);
        try {
            startAiTransition(async () => {
                const iaInputPayload = await formatPlantioForm(data);
                const resultIA = await processarPlantioIAAction(
                    iaInputPayload as IAEntradaPlantio,
                );

                if (resultIA.error) {
                    setAiResponse(null);
                } else if (resultIA.data) {
                    setAiResponse(JSON.stringify(resultIA.data, null, 2));
                    console.log('Resposta da IA:', resultIA.data);
                } else {
                    setAiResponse(null);
                }
            });
        } catch (error) {
            console.error('Erro ao formatar dados para IA:', error);
        }
    }
    function onError(errors: FieldErrors<NewPlantioForm>) {
        console.error('Erro de validação do formulário:', errors);
    }

    const isBusy = isLoadingAi;

    const formErrors = form.formState.errors;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
                    <div className="space-y-4 lg:col-span-2">
                        <Pokedex control={form.control} isBusy={isBusy} />
                        <InformacoesAdicionaisField
                            control={form.control}
                            disabled={isBusy}
                        />
                    </div>

                    <div className="space-y-4 lg:col-span-2">
                        <OndePlantarField
                            control={form.control}
                            isBusy={isBusy}
                        />
                        <ComoPlantarField
                            control={form.control}
                            isBusy={isBusy}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    {Object.keys(formErrors).length > 0 && (
                        <div className="text-destructive text-sm">
                            O formulário contém erros
                        </div>
                    )}
                    <Button
                        type="submit"
                        disabled={isBusy}
                        className="w-full cursor-pointer text-base"
                    >
                        <span>Plantar com IA</span>
                        <i className="ph ph-sparkle text-lg" />
                    </Button>
                </div>
            </form>
            <SubmittedJsonDisplay jsonString={aiResponse} />
        </Form>
    );
}
