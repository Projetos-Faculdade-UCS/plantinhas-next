import { FiltrosPlanta } from '@/entities/filtros-plantas';
import { CatalogoPlantas } from '@/features/lista-plantas/catalogo-plantas';
import { CatalogoSkeleton } from '@/features/lista-plantas/catalogo-skeleton';
import { SearchResults } from '@/features/lista-plantas/search-results';
import { Button } from '@/shared/ui/button';
import { Suspense } from 'react';

export default async function CatalogoPlantasPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { search } = await searchParams;

    return (
        <div className="flex h-full w-full flex-col gap-4 py-2 pl-2 lg:py-4 lg:pl-8">
            <div className="flex items-center justify-between gap-2 pr-8">
                <div className="text-primary flex items-center gap-2 px-2">
                    <i className="ph ph-book-bookmark text-3xl" />
                    <p className="text-2xl font-medium">Catálogo de Plantas</p>
                </div>
                <Button
                    variant="default"
                    className="hidden lg:flex"
                    title="Sugerir Planta"
                >
                    <i className="ph ph-plus-circle flex text-lg"></i>
                    Sugerir
                </Button>
            </div>
            <FiltrosPlanta />
            {search ? (
                <SearchResults search={search as string} />
            ) : (
                <Suspense fallback={<CatalogoSkeleton />}>
                    <CatalogoPlantas />
                </Suspense>
            )}
        </div>
    );
}
