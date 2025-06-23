import { NewPlantioForm } from './cadastro-plantio.schema';
import { IAEntradaPlantio } from './ia-api.schema';
import { getHabilidadesAction, getPlantaAction } from './plantio.action';

/**
 * Formata os dados do formulário de plantio para o formato esperado pela IA.
 * @param data Dados do formulário de plantio.
 * @returns Objeto formatado conforme IAEntradaPlantio.
 */
export async function formatPlantioForm(
    plantio: NewPlantioForm,
): Promise<IAEntradaPlantio> {
    const planta = (await getPlantaAction(Number(plantio.plantaId))).data;
    const habilidades = (await getHabilidadesAction()).data;
    if (!planta || !habilidades) {
        throw new Error('Planta não encontrada ou inválida');
    }

    const dataInicioPlantio = new Date().toISOString().split('T')[0];
    const builtPayload: IAEntradaPlantio = {
        data_inicio_plantio: dataInicioPlantio,
        planta: {
            nome: planta.nome,
            nome_cientifico: planta.nomeCientifico || planta.nome,
            dificuldade: planta.dificuldade,
            temperatura_ideal: planta.temperatura,
        },
        quantidade: plantio.quantidade,
        ambiente: plantio.ambiente,
        sistemaCultivo: plantio.sistemaCultivo,
        informacoes_adicionais: plantio.informacoesAdicionais || '',
        habilidades_existentes: habilidades?.length > 0 ? habilidades : [],
    };

    return builtPayload;
}
