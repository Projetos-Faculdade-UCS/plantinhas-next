import { Planta } from '@/shared/types/planta';
import { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { getHabilidadesAction } from '../actions/plantio.actions';
import {
    AmbientesSchema,
    SistemaCultivoEnum,
} from '../schemas/cadastro-plantio.schema';
import {
    IAAmbienteSchema,
    IAEntradaPlantio,
    IAEntradaPlantioSchema,
} from '../schemas/ia-api.schema';

export type LocalAmbienteType = z.infer<typeof AmbientesSchema.shape.local>;
export type CondicaoAmbienteFormType = z.infer<
    typeof AmbientesSchema.shape.condicao
>;
export type SistemaCultivoType = z.infer<typeof SistemaCultivoEnum>;
export type CondicaoAmbienteIAType = z.infer<
    typeof IAAmbienteSchema.shape.condicao
>;

interface UsePlantioPayloadProps {
    quantidade: number | undefined;
    localAmbiente: LocalAmbienteType | undefined;
    condicaoAmbiente: CondicaoAmbienteFormType | undefined;
    sistemaCultivo: SistemaCultivoType | undefined;
    informacoesAdicionais: string | undefined;
    plantaDetalhes: Planta | null;
}

function mapCondicaoAmbienteToIA(
    condicao: CondicaoAmbienteFormType,
): CondicaoAmbienteIAType {
    switch (condicao) {
        case 'interno':
            return 'interno';
        case 'externo':
        case 'semi-protegido':
        case 'comunitario':
            return 'externo';
        default:
            console.warn(
                `Condição de ambiente não mapeada: ${condicao}, usando 'externo'.`,
            );
            return 'externo';
    }
}

export function usePlantioPayload({
    quantidade,
    localAmbiente,
    condicaoAmbiente,
    sistemaCultivo,
    informacoesAdicionais,
    plantaDetalhes,
}: UsePlantioPayloadProps) {
    const [isProcessing, startProcessingTransition] = useTransition();
    const [plantioPayload, setPlantioPayload] =
        useState<IAEntradaPlantio | null>(null);
    const [payloadJson, setPayloadJson] = useState<string | null>(null);
    const [payloadValidationError, setPayloadValidationError] = useState<
        string | null
    >(null);
    const [habilidadesUsuario, setHabilidadesUsuario] = useState<string[]>([]);
    useEffect(() => {
        if (
            quantidade === undefined ||
            !localAmbiente ||
            !condicaoAmbiente ||
            !sistemaCultivo ||
            !plantaDetalhes
        ) {
            setPlantioPayload(null);
            setPayloadJson(null);
            return;
        }

        getHabilidadesAction().then((resultHabilidades) => {
            if (resultHabilidades.data) {
                setHabilidadesUsuario(resultHabilidades.data);
            } else if (resultHabilidades.error) {
                console.error(
                    'Erro ao buscar habilidades:',
                    resultHabilidades.error,
                );
                setHabilidadesUsuario([]);
            }
        });

        startProcessingTransition(() => {
            setPayloadValidationError(null);

            const dataInicioPlantio = new Date().toISOString().split('T')[0];

            const mappedCondicaoAmbiente =
                mapCondicaoAmbienteToIA(condicaoAmbiente);

            const builtPayload: Omit<IAEntradaPlantio, 'planta'> & {
                planta: Partial<IAEntradaPlantio['planta']>;
            } = {
                data_inicio_plantio: dataInicioPlantio,
                planta: {
                    nome: plantaDetalhes.nome,
                    nome_cientifico:
                        plantaDetalhes.nomeCientifico || plantaDetalhes.nome,
                    dificuldade: plantaDetalhes.dificuldade,
                    temperatura_ideal: plantaDetalhes.temperatura,
                },
                quantidade: quantidade,
                ambiente: {
                    local: localAmbiente,
                    condicao: mappedCondicaoAmbiente,
                },
                sistemaCultivo: sistemaCultivo,
                informacoes_adicionais: informacoesAdicionais || '',
                habilidades_existentes:
                    habilidadesUsuario && habilidadesUsuario.length > 0
                        ? habilidadesUsuario
                        : [],
            };

            const finalPlantaPayload = Object.fromEntries(
                Object.entries(builtPayload.planta).filter(
                    ([, value]) => value !== undefined,
                ),
            ) as IAEntradaPlantio['planta'];

            const finalBuiltPayload = {
                ...builtPayload,
                planta: finalPlantaPayload,
            };

            const parsedResult =
                IAEntradaPlantioSchema.safeParse(finalBuiltPayload);

            if (parsedResult.success) {
                setPlantioPayload(parsedResult.data);
                setPayloadJson(JSON.stringify(parsedResult.data, null, 2));
                setPayloadValidationError(null);
            } else {
                console.error(
                    'Erro ao validar payload para API de IA:',
                    parsedResult.error.flatten(),
                );
                setPlantioPayload(null);
                setPayloadJson(null);
                setPayloadValidationError(
                    'Erro na validação dos dados para IA: ' +
                        parsedResult.error.message,
                );
            }
        });
    }, [
        quantidade,
        localAmbiente,
        condicaoAmbiente,
        sistemaCultivo,
        informacoesAdicionais,
        plantaDetalhes,
        habilidadesUsuario,
    ]);

    return {
        plantioPayload,
        payloadJson,
        payloadValidationError,
        isProcessingPayload: isProcessing,
    };
}
