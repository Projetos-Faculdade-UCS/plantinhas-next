'use server';

import { Planta } from '@/shared/types/planta';
import { NetWorkError } from '../client/errors';
import { Repositories } from '../repositories';

export async function getPlantas(
    search: string,
    page: number = 1,
    tamanhoPagina: number = 10,
) {
    try {
        const response = await Repositories.plantas.searchPlantas({
            search,
            page,
            itensPorPagina: tamanhoPagina,
        });
        return { data: response.data };
    } catch (error) {
        return {
            error: (error as Error).message || 'Falha ao buscar plantas.',
        };
    }
}

export async function getPlantaById(
    id: number,
): Promise<{ data?: Planta; error?: string }> {
    try {
        const response = await Repositories.plantas.getPlanta(id);
        return { data: response.data };
    } catch (error) {
        return {
            error:
                (error as Error).message ||
                'Falha ao buscar detalhes da planta.',
        };
    }
}

export async function getFotoPlanta(fotoUrl: string) {
    try {
        return Repositories.plantas.getFotoPlanta(fotoUrl).then((res) => {
            return res;
        });
    } catch (error) {
        console.log(error);
        if (error instanceof NetWorkError) {
            return {
                data: null,
                status: error.status,
            };
        }
        return {
            data: null,
            status: 500,
        };
    }
}
