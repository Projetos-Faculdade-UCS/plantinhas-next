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

// Importando os novos componentes de campo
import { InformacoesAdicionaisField } from './fields/informacoes-adicionais-field';
import { OndePlantarField } from './fields/onde-plantar-field';
import { SubmittedJsonDisplay } from './SubmittedJsonDisplay';

// Importando os novos hooks
import { gerarPlantio } from '@/shared/api/actions/ai';
import { formatPlantioForm } from '../lib/format-plantio-form';
import { ComoPlantarField } from './fields/como-plantar-field';
import { Pokedex } from './select-planta/pokedex';

export function CadastroPlantioForm() {
    const searchParams = useSearchParams();
    const [isFormBusy, startAiTransition] = useTransition();
    const [aiError, setAiError] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string | null>(null);

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
        console.log('Dados do formulário:', data);
        setAiResponse(null);
        try {
            startAiTransition(async () => {
                const iaInputPayload = await formatPlantioForm(data);
                console.log('Payload formatado para IA:', iaInputPayload);
                const resultIA = await gerarPlantio(iaInputPayload);

                if (resultIA.error) {
                    setAiError(resultIA.error);
                }
                if (resultIA.data) {
                    setAiResponse(JSON.stringify(resultIA.data, null, 2));
                    console.log('Resposta da IA:', resultIA.data);
                }
            });
        } catch {
            form.setError('root', {
                type: 'manual',
                message: 'Erro ao criar plantio.',
            });
        }
    }

    function onError(errors: FieldErrors<NewPlantioForm>) {
        console.error('Erro de validação do formulário:', errors);
    }

    const formErrors = form.formState.errors;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-4"
            >
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
                        <span>Plantar com IA</span>
                        <i className="ph ph-sparkle text-lg" />
                    </Button>
                </div>
            </form>
            <SubmittedJsonDisplay jsonString={aiResponse} />
        </Form>
    );
}
