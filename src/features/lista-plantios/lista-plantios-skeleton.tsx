import { CardPlantioSkeleton } from '@/entities/card-plantio/card-plantio-skeleton';
import { Skeleton } from '@/shared/ui/skeleton';

export function ListaPlantiosSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-1/2" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <CardPlantioSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
