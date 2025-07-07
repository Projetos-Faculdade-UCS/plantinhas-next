'use server';

import { Repositories } from '@/shared/api/repositories';
import { Habilidade } from '@/shared/types/habilidades';

export async function getHabilidades(): Promise<{
    data?: Habilidade[];
    error?: string;
}> {
    try {
        console.log('[DEBUG] getHabilidades:');
        const habilidades = await Repositories.habilidades.getHabilidades();
        return { data: habilidades.data };
    } catch (error) {
        console.error('Error in getHabilidades:', error);
        return {
            error: (error as Error).message || 'Falha ao buscar habilidades.',
        };
    }
}
