'use client';

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
import { processarPlantioIAAction } from '../actions/plantio.actions';
import {
    CadastroPlantioFormValues,
    CadastroPlantioSchema,
} from '../schemas/cadastro-plantio.schema';
import { IAEntradaPlantio } from '../schemas/ia-api.schema';

// Importando os novos componentes de campo
import { AmbienteCondicaoField } from './fields/AmbienteCondicaoField';
import { AmbienteLocalField } from './fields/AmbienteLocalField';
import { InformacoesAdicionaisField } from './fields/InformacoesAdicionaisField';
import { QuantidadeField } from './fields/QuantidadeField';
import { SelectPlantaField } from './fields/select-planta-field';
import { SistemaCultivoField } from './fields/SistemaCultivoField';
import { SubmittedJsonDisplay } from './SubmittedJsonDisplay';

// Importando os novos hooks
import { usePlantaDetalhes } from '../hooks/usePlantaDetalhes';
import { usePlantioPayload } from '../hooks/usePlantioPayload';
import { HabilidadesField } from './fields/habilidades-field';

export function CadastroPlantioForm() {
    const searchParams = useSearchParams();
    const [isLoadingAi, startAiTransition] = useTransition();
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<CadastroPlantioFormValues>({
        resolver: zodResolver(CadastroPlantioSchema),
        defaultValues: {
            plantaId: searchParams.get('plantaId') || undefined,
            quantidade: 1,
            informacoesAdicionais: '',
            ambiente: { local: undefined, condicao: undefined },
            sistemaCultivo: undefined,
        },
        mode: 'onChange',
    });

    const watchedPlantaId = form.watch('plantaId');
    const {
        plantaSelecionadaDetalhes,
        isLoadingDetalhes: isLoadingPlantaDetalhes,
    } = usePlantaDetalhes(watchedPlantaId);

    const allFormValues = form.watch();
    const {
        plantioPayload: iaInputPayload,
        payloadValidationError,
        isProcessingPayload,
    } = usePlantioPayload({
        quantidade: allFormValues.quantidade,
        localAmbiente: allFormValues.ambiente?.local,
        condicaoAmbiente: allFormValues.ambiente?.condicao,
        sistemaCultivo: allFormValues.sistemaCultivo,
        informacoesAdicionais: allFormValues.informacoesAdicionais,
        plantaDetalhes: plantaSelecionadaDetalhes,
    });

    async function onSubmit(data: CadastroPlantioFormValues) {
        setAiResponse(null);

        if (payloadValidationError) {
            console.error(
                'Erro de validação do payload (IA) detectado pelo hook usePlantioPayload:',
                payloadValidationError,
            );
            setSubmitError(payloadValidationError);
            return;
        }

        if (!iaInputPayload) {
            console.error(
                'Payload de entrada para IA (iaInputPayload) não está pronto ou é nulo. Verifique os campos e dependências.',
            );
            setSubmitError(
                'Os dados para a IA não puderam ser preparados. Verifique os campos ou tente novamente.',
            );
            return;
        }

        startAiTransition(async () => {
            console.log('Enviando para IA:', iaInputPayload);
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
                setSubmitError('A API de IA não retornou uma resposta válida.');
                setAiResponse(null);
            }
        });
    }

    const isBusy =
        isLoadingPlantaDetalhes || isProcessingPayload || isLoadingAi;

    const getButtonText = () => {
        if (isLoadingAi) return 'Processando com IA...';
        if (isProcessingPayload) return 'Preparando Dados para IA...';
        if (isLoadingPlantaDetalhes) return 'Carregando Componentes...';
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
