'use server';

import { Repositories } from '@/shared/api/repositories';
import { ListagemPlantas, Planta } from '@/shared/types/planta';
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

export async function searchPlantasAction(
    search?: string,
    pagina?: number,
): Promise<ActionResult<ListagemPlantas>> {
    try {
        console.log('[DEBUG] searchPlantasAction:', search, pagina);
        const response = await Repositories.plantas.searchPlantas(
            search,
            pagina,
        );
        return { data: response.data };
    } catch (error) {
        console.error('Error in searchPlantasAction:', error);
        return {
            error: (error as Error).message || 'Falha ao buscar plantas.',
        };
    }
}

export async function getPlantaAction(
    id: number,
): Promise<ActionResult<Planta>> {
    try {
        console.log('[DEBUG] getPlantaAction:', id);
        const response = await Repositories.plantas.getPlanta(id);
        return { data: response.data };
    } catch (error) {
        console.error('Error in getPlantaAction:', error);
        return {
            error:
                (error as Error).message ||
                'Falha ao buscar detalhes da planta.',
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
