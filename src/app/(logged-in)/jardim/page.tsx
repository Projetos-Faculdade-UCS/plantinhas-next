import { MyLocationMetrics } from '@/entities/my-location-metrics';
import { ListaPlantios } from '@/features/lista-plantios';
import { ListaPlantiosSkeleton } from '@/features/lista-plantios/lista-plantios-skeleton';
import { Suspense } from 'react';

export default function JardimPage() {
    return (
        <>
            <MyLocationMetrics />
            <Suspense fallback={<ListaPlantiosSkeleton />}>
                <ListaPlantios />
            </Suspense>
        </>
    );
}
