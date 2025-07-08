import { InfiniteData } from '@tanstack/react-query';
import { PlantaPreview } from '../types/planta';
import { PagedResponse } from '../types/utils';
/**
 *
 * @param paginatedData objeto de dados do react-query
 * @returns um array de plantas sem repetições de ids
 */
export function cleanPaginatedPlantas(
    paginatedData:
        | InfiniteData<PagedResponse<PlantaPreview>, unknown>
        | undefined,
) {
    const query = paginatedData?.pages.map((page) => page.itens).flat() ?? [];

    const ids = query.map((planta) => planta.id);
    const uniqueIds = Array.from(new Set(ids));
    const uniquePlantas = uniqueIds
        .map((id) => query.find((planta) => planta.id === id))
        .filter((planta): planta is PlantaPreview => planta !== undefined);

    return uniquePlantas;
}
