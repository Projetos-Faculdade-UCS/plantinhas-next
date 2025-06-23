'use client';

import {
    CadastroPlantioSchema,
    NewPlantioForm,
} from '@/features/cadastro-plantio/lib/cadastro-plantio.schema';
import { Button } from '@/shared/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/ui/card';
import { Form } from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { IAEntradaPlantio } from '../lib/ia-api.schema';
import { processarPlantioIAAction } from '../lib/plantio.action';

// Importando os novos componentes de campo
import { AmbienteCondicaoField } from './fields/AmbienteCondicaoField';
import { AmbienteLocalField } from './fields/AmbienteLocalField';
import { InformacoesAdicionaisField } from './fields/InformacoesAdicionaisField';
import { QuantidadeField } from './fields/quantidade-field';
import { SelectPlantaField } from './fields/select-planta-field';
import { SistemaCultivoField } from './fields/SistemaCultivoField';
import { SubmittedJsonDisplay } from './SubmittedJsonDisplay';

// Importando os novos hooks
import { formatPlantioForm } from '../lib/format-plantio-form';
import { HabilidadesField } from './fields/habilidades-field';

export function CadastroPlantioForm() {
    const searchParams = useSearchParams();
    const [isLoadingAi, startAiTransition] = useTransition();
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<NewPlantioForm>({
        resolver: zodResolver(CadastroPlantioSchema),
        defaultValues: {
            plantaId: searchParams.get('plantaId') || undefined,
            quantidade: 1,
            informacoesAdicionais: '',
            ambiente: { local: undefined, condicao: undefined },
            sistemaCultivo: undefined,
        },
        mode: 'onSubmit',
    });

    // const watchedPlantaId = form.watch('plantaId');
    // const allFormValues = form.watch();

    async function onSubmit(data: NewPlantioForm) {
        setAiResponse(null);
        try {
            startAiTransition(async () => {
                const iaInputPayload = await formatPlantioForm(data);
                const resultIA = await processarPlantioIAAction(
                    iaInputPayload as IAEntradaPlantio,
                );

                if (resultIA.error) {
                    setSubmitError(resultIA.error);
                    setAiResponse(null);
                } else if (resultIA.data) {
                    setAiResponse(JSON.stringify(resultIA.data, null, 2));
                    setSubmitError(null);
                    console.log('Resposta da IA:', resultIA.data);
                } else {
                    setSubmitError(
                        'A API de IA não retornou uma resposta válida.',
                    );
                    setAiResponse(null);
                }
            });
        } catch (error) {
            console.error('Erro ao formatar dados para IA:', error);
            setSubmitError('Erro ao formatar dados para IA');
        }
    }

    const isBusy = isLoadingAi;

    const getButtonText = () => {
        if (isLoadingAi) return 'Processando com IA...';
        return 'Registrar Plantio (com IA)';
    };
    const formErrors = form.formState.errors;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {Object.keys(formErrors).length > 0 && (
                    <Card className="border-destructive bg-destructive/10 py-0">
                        <CardHeader className="p-4">
                            <CardTitle className="text-destructive">
                                Ocorreu um Erro
                            </CardTitle>
                            <CardDescription className="text-destructive">
                                {submitError ||
                                    'Verifique os campos e tente novamente.'}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )}

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Coluna 1: Detalhes da Planta e Observações */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalhes da Planta</CardTitle>
                                <CardDescription>
                                    Selecione a planta e a quantidade a ser
                                    registrada.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <SelectPlantaField
                                    control={form.control}
                                    disabled={isBusy}
                                />
                                <QuantidadeField
                                    control={form.control}
                                    disabled={isBusy}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Observações Adicionais</CardTitle>
                                <CardDescription>
                                    Forneça qualquer detalhe extra sobre o
                                    plantio (opcional).
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <InformacoesAdicionaisField
                                    control={form.control}
                                    disabled={isBusy}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coluna 2: Condições de Plantio e Habilidades */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Condições de Plantio</CardTitle>
                                <CardDescription>
                                    Especifique o ambiente e o sistema de
                                    cultivo.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <AmbienteLocalField
                                    control={form.control}
                                    disabled={isBusy}
                                />
                                <AmbienteCondicaoField
                                    control={form.control}
                                    disabled={isBusy}
                                />
                                <SistemaCultivoField
                                    control={form.control}
                                    disabled={isBusy}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Habilidades de Jardinagem</CardTitle>
                                <CardDescription>
                                    Selecione suas habilidades de jardinagem.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <HabilidadesField />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isBusy}
                    className="w-full py-6 text-lg"
                >
                    {getButtonText()}
                </Button>
            </form>

            <SubmittedJsonDisplay jsonString={aiResponse} />
        </Form>
    );
}
