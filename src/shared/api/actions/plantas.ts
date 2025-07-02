'use server';

import { NetWorkError } from '../client/errors';
import { Repositories } from '../repositories';

export async function getPlantas(search: string, page: number = 1) {
    return Repositories.plantas.searchPlantas(search, page).then((res) => {
        return res.data;
    });
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
