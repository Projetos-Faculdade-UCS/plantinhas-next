import { CardPlantaSkeleton } from '@/entities/card-planta/card-planta-skeleton';
import { PrateleiraPlantas } from '@/entities/prateleira-plantas';
import { Skeleton } from '@/shared/ui/skeleton';

export function CatalogoSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex w-full flex-col gap-2">
                    <div className="text-muted-foreground flex items-center gap-2 px-2">
                        <Skeleton className="h-6 w-42 py-[2px]" />
                        <Skeleton className="h-6 w-4" />
                        <Skeleton className="h-6 w-4" />
                    </div>
                    <PrateleiraPlantas>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CardPlantaSkeleton key={index} />
                        ))}
                    </PrateleiraPlantas>
                </div>
            ))}
        </div>
    );
}
