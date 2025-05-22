import { FiltrosPlanta } from '@/entities/filtros-plantas';
import { CatalogoPlantas } from '@/features/lista-plantas/catalogo-plantas';
import { CatalogoSkeleton } from '@/features/lista-plantas/catalogo-skeleton';
import { SearchResults } from '@/features/lista-plantas/search-results';
import { Suspense } from 'react';

export default async function CatalogoPlantasPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { search } = await searchParams;

    return (
        <>
            <FiltrosPlanta />
            {search ? (
                <SearchResults search={search as string} />
            ) : (
                <Suspense fallback={<CatalogoSkeleton />}>
                    <CatalogoPlantas />
                </Suspense>
            )}
        </>
    );
}
