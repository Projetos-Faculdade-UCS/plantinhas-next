'use server';
import { AISaidaPlantio, IAEntradaPlantio } from '@/shared/types/ai';
import { Repositories } from '../repositories';

export async function gerarPlantio(
    payload: IAEntradaPlantio,
): Promise<{ data?: AISaidaPlantio; error?: string }> {
    try {
        const response = await Repositories.ia.gerarPlantio(payload);
        return { data: response.data };
    } catch (error) {
        return {
            error: (error as Error).message || 'Falha ao processar o plantio.',
        };
    }
}
