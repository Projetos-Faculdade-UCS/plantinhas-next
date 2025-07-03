'use server';

import { Repositories } from '@/shared/api/repositories';
import { IAEntradaPlantio, IASaidaPlantio } from './ia-api.schema';

interface ActionResult<T> {
    data?: T;
    error?: string;
}

export async function getHabilidadesAction(): Promise<ActionResult<string[]>> {
    try {
        console.log('[DEBUG] getHabilidadesAction:');
        const habilidades =
            await Repositories.profile.getHabilidadesExistentes();
        return { data: habilidades };
    } catch (error) {
        console.error('Error in getHabilidadesAction:', error);
        return {
            error: (error as Error).message || 'Falha ao buscar habilidades.',
        };
    }
}

export async function processarPlantioIAAction(
    payload: IAEntradaPlantio,
): Promise<ActionResult<IASaidaPlantio>> {
    try {
        console.log('[DEBUG] processarPlantioIAAction:', payload);
        const response = await Repositories.ia.processarPlantio(payload);
        return { data: response.data || undefined };
    } catch (error) {
        console.error('Error in processarPlantioIAAction:', error);
        return {
            error: (error as Error).message || 'Falha ao processar o plantio.',
        };
    }
}
