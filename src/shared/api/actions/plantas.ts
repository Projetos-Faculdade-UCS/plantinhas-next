'use server';

import { Repositories } from '../repositories';

export async function getPlantas(search: string, page: number = 1) {
    return Repositories.plantas.searchPlantas(search, page).then((res) => {
        return res.data;
    });
}
