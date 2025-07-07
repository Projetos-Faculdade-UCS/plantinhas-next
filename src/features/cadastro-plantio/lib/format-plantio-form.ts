import { getHabilidades } from '@/shared/api/actions/habilidades';
import { getPlantaById } from '@/shared/api/actions/plantas';
import { IAEntradaPlantio } from '@/shared/types/ai';
import { NewPlantioForm } from './cadastro-plantio.schema';

/**
 * Formata os dados do formulário de plantio para o formato esperado pela IA.
 * @param data Dados do formulário de plantio.
 * @returns Objeto formatado conforme IAEntradaPlantio.
 */
export async function formatPlantioForm(
    plantio: NewPlantioForm,
): Promise<IAEntradaPlantio> {
    const planta = (await getPlantaById(Number(plantio.plantaId))).data;
    const habilidades = (await getHabilidades()).data;
    if (!planta || !habilidades) {
        throw new Error('Planta não encontrada ou inválida');
    }
    const cleanHabilidades = habilidades.map((habilidade) => ({
        id: habilidade.id,
        nome: habilidade.nome,
        descricao: habilidade.descricao,
    }));

    const dataInicioPlantio = new Date().toISOString().split('T')[0];
    const builtPayload: IAEntradaPlantio = {
        data_inicio_plantio: dataInicioPlantio,
        planta: {
            nome: planta.nome,
            nome_cientifico: planta.nomeCientifico || planta.nome,
            dificuldade: planta.dificuldade,
            dias_maturidade: planta.diasMaturidade,
            temperatura_minima: `${planta.temperaturaMinima} °C`,
            temperatura_maxima: `${planta.temperaturaMaxima} °C`,
            temperatura_ideal: `${planta.temperaturaIdeal} °C`,
        },
        quantidade: plantio.quantidade,
        ambiente: plantio.ambiente,
        sistemaCultivo: plantio.sistemaCultivo,
        informacoes_adicionais: plantio.informacoesAdicionais || '',
        habilidades_existentes: cleanHabilidades,
    };

    return builtPayload;
}
