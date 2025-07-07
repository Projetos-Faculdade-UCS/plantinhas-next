'use server';
import { IASaidaPlantio } from '@/features/cadastro-plantio/lib/ia-api.schema';
import { IAEntradaPlantio } from '@/shared/types/ai';
import { Repositories } from '../repositories';

export async function gerarPlantio(
    payload: IAEntradaPlantio,
): Promise<{ data?: IASaidaPlantio; error?: string }> {
    try {
        const response = await Repositories.ia.gerarPlantio(payload);
        return { data: response.data };
    } catch (error) {
        return {
            error: (error as Error).message || 'Falha ao processar o plantio.',
        };
    }
}
