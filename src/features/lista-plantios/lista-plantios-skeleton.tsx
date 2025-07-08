import { CardPlantioSkeleton } from '@/entities/card-plantio/card-plantio-skeleton';
import { Skeleton } from '@/shared/ui/skeleton';

export function ListaPlantiosSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-8" />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <CardPlantioSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
