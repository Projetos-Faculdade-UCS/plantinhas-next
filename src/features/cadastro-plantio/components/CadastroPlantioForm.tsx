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
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
    getPlantaAction,
    processarPlantioIAAction,
} from '../actions/plantio.actions';
import {
    CadastroPlantioFormValues,
    CadastroPlantioSchema,
} from '../schemas/cadastro-plantio.schema';
import { IAEntradaPlantio } from '../schemas/ia-api.schema';

// Importando os novos componentes de campo
import { AmbienteCondicaoField } from './fields/AmbienteCondicaoField';
import { AmbienteLocalField } from './fields/AmbienteLocalField';
import { InformacoesAdicionaisField } from './fields/InformacoesAdicionaisField';
import { PlantaField } from './fields/PlantaField';
import { QuantidadeField } from './fields/QuantidadeField';
import { SistemaCultivoField } from './fields/SistemaCultivoField';
import { SubmittedJsonDisplay } from './SubmittedJsonDisplay';

// Importando os novos hooks
import { usePlantaDetalhes } from '../hooks/usePlantaDetalhes';
import { usePlantioInitialData } from '../hooks/usePlantioInitialData';
import { usePlantioPayload } from '../hooks/usePlantioPayload';

export function CadastroPlantioForm() {
    const searchParams = useSearchParams();
    const [isSubmittingForm, startFormSubmitTransition] = useTransition();
    const [isCallingIA, startIACallTransition] = useTransition();
    const [submittedIaResponseJson, setSubmittedIaResponseJson] = useState<
        string | null
    >(null);
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
    });

    const {
        habilidadesUsuario,
        listaPlantas,
        isLoadingInitialData,
        initialDataError,
    } = usePlantioInitialData();

    const watchedPlantaId = form.watch('plantaId');
    const {
        plantaSelecionadaDetalhes,
        isLoadingDetalhes: isLoadingPlantaDetalhes,
        detalhesError: plantaDetalhesError,
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
        habilidadesUsuario,
    });

    useEffect(() => {
        if (payloadValidationError) {
            setSubmitError(payloadValidationError);
        } else if (submitError === payloadValidationError) {
            setSubmitError(null);
        }
    }, [payloadValidationError]);

    const [displayError, setDisplayError] = useState<string | null>(null);
    useEffect(() => {
        if (submitError && submitError !== payloadValidationError)
            setDisplayError(submitError);
        else if (payloadValidationError)
            setDisplayError(payloadValidationError);
        else if (plantaDetalhesError) setDisplayError(plantaDetalhesError);
        else if (initialDataError) setDisplayError(initialDataError);
        else setDisplayError(null);
    }, [
        submitError,
        payloadValidationError,
        plantaDetalhesError,
        initialDataError,
    ]);

    async function onSubmit(data: CadastroPlantioFormValues) {
        setSubmitError(null);
        setSubmittedIaResponseJson(null);

        if (!data.plantaId) {
            form.setError('plantaId', {
                type: 'manual',
                message: 'Selecione uma planta.',
            });
            setSubmitError('Selecione uma planta.');
            return;
        }

        let currentPlantaDetalhes = plantaSelecionadaDetalhes;

        if (
            !currentPlantaDetalhes ||
            String(currentPlantaDetalhes.id) !== data.plantaId
        ) {
            if (isLoadingPlantaDetalhes) {
                setSubmitError(
                    'Aguardando detalhes da planta. Tente novamente em instantes.',
                );
                return;
            }
            if (plantaDetalhesError) {
                setSubmitError(
                    `Erro ao carregar detalhes da planta: ${plantaDetalhesError}. Verifique a seleção e tente novamente.`,
                );
                return;
            }
            console.warn(
                'Detalhes da planta dessincronizados ou não carregados. Tentando buscar novamente antes de montar o payload IA...',
            );
            let fetchAttemptError: string | null = null;
            await new Promise<void>((resolve) => {
                startFormSubmitTransition(async () => {
                    const resultPlanta = await getPlantaAction(
                        Number(data.plantaId),
                    );
                    if (resultPlanta.data) {
                        currentPlantaDetalhes = resultPlanta.data;
                    } else {
                        currentPlantaDetalhes = null;
                        fetchAttemptError =
                            resultPlanta.error ||
                            'Falha ao buscar detalhes da planta para submissão.';
                    }
                    resolve();
                });
            });
            if (fetchAttemptError || !currentPlantaDetalhes) {
                setSubmitError(
                    fetchAttemptError ||
                        'Não foi possível obter os detalhes da planta atualizados para a submissão.',
                );
                return;
            }
        }

        if (
            !data.ambiente?.local ||
            !data.ambiente?.condicao ||
            !data.sistemaCultivo
        ) {
            if (!data.ambiente?.local)
                form.setError('ambiente.local', {
                    type: 'manual',
                    message: 'Campo obrigatório',
                });
            if (!data.ambiente?.condicao)
                form.setError('ambiente.condicao', {
                    type: 'manual',
                    message: 'Campo obrigatório',
                });
            if (!data.sistemaCultivo)
                form.setError('sistemaCultivo', {
                    type: 'manual',
                    message: 'Campo obrigatório',
                });
            setSubmitError(
                'Preencha todos os campos obrigatórios de ambiente e sistema de cultivo.',
            );
            return;
        }

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

        startIACallTransition(async () => {
            console.log('Enviando para IA:', iaInputPayload);
            const resultIA = await processarPlantioIAAction(
                iaInputPayload as IAEntradaPlantio,
            );

            if (resultIA.error) {
                setSubmitError(resultIA.error);
                setSubmittedIaResponseJson(null);
            } else if (resultIA.data) {
                setSubmittedIaResponseJson(
                    JSON.stringify(resultIA.data, null, 2),
                );
                setSubmitError(null);
                console.log('Resposta da IA:', resultIA.data);
            } else {
                setSubmitError('A API de IA não retornou uma resposta válida.');
                setSubmittedIaResponseJson(null);
            }
        });
    }

    const isBusy =
        isLoadingInitialData ||
        isLoadingPlantaDetalhes ||
        isSubmittingForm ||
        isProcessingPayload ||
        isCallingIA;
    const getButtonText = () => {
        if (isCallingIA) return 'Processando com IA...';
        if (isSubmittingForm) return 'Validando e Buscando Dados...';
        if (isProcessingPayload) return 'Preparando Dados para IA...';
        if (isLoadingInitialData || isLoadingPlantaDetalhes)
            return 'Carregando Componentes...';
        return 'Registrar Plantio (com IA)';
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <PlantaField
                                    control={form.control}
                                    disabled={
                                        isBusy ||
                                        (listaPlantas.length === 0 &&
                                            !initialDataError)
                                    }
                                    listaPlantas={listaPlantas}
                                    errorState={displayError}
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
                                <CardTitle>Seu Perfil de Jardinagem</CardTitle>
                                <CardDescription>
                                    Estas são suas habilidades registradas:
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingInitialData && (
                                    <p className="text-muted-foreground text-sm">
                                        Carregando habilidades...
                                    </p>
                                )}
                                {!isLoadingInitialData &&
                                    habilidadesUsuario.length > 0 && (
                                        <ul className="list-inside list-disc space-y-1 text-sm">
                                            {habilidadesUsuario.map(
                                                (habilidade) => (
                                                    <li key={habilidade}>
                                                        {habilidade}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                {!isLoadingInitialData &&
                                    habilidadesUsuario.length === 0 &&
                                    !initialDataError && (
                                        <p className="text-muted-foreground text-sm">
                                            Nenhuma habilidade encontrada.
                                        </p>
                                    )}
                                {initialDataError && !isLoadingInitialData && (
                                    <p className="text-destructive text-sm">
                                        Erro ao carregar habilidades:{' '}
                                        {initialDataError}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {displayError && (
                    <Card className="border-destructive bg-destructive/10">
                        <CardHeader>
                            <CardTitle className="text-destructive">
                                Ocorreu um Erro
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-destructive text-sm font-medium">
                                {displayError}
                            </p>
                        </CardContent>
                    </Card>
                )}

                <Button
                    type="submit"
                    disabled={isBusy}
                    className="w-full py-6 text-lg"
                >
                    {getButtonText()}
                </Button>
            </form>

            <SubmittedJsonDisplay jsonString={submittedIaResponseJson} />
        </Form>
    );
}
