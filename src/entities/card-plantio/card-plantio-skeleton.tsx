import { Skeleton } from '@/shared/ui/skeleton';
import Image from 'next/image';
import { Ondulacao } from '../card-planta/ondulacao';

export function CardPlantioSkeleton() {
    return (
        <div className="relative w-[10.5rem] shrink-0 sm:w-[13.5rem]">
            <div className={`flex h-full flex-col`}>
                <div className="h-8"></div>
                <Ondulacao />
                <div className="bg-card h-8 border-x"></div>
                <div className="bg-card flex justify-center gap-2 border-x pt-1 pb-3">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>
                <div
                    className={`bg-muted-foreground flex shrink-0 items-center justify-between rounded-b-md border border-x border-b bg-linear-to-t px-2 py-2 transition duration-300`}
                >
                    <div className="flex flex-col gap-2">
                        <Skeleton className="bg-muted h-4 w-3/4 rounded-md" />
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }, (_, index) => {
                                const isActive = 2 > index;
                                return (
                                    <div
                                        key={index}
                                        className={`bg-muted h-2 w-5 rounded-sm border ${isActive ? 'opacity-100' : 'opacity-40'}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <Skeleton className="bg-muted h-10 w-10 rounded-full" />
                </div>
            </div>
            <div className="absolute top-0 left-0 z-[1] flex w-full justify-center">
                <Image
                    src={'/assets/loading.png'}
                    alt={`Foto da planta em carregamento`}
                    width={1000}
                    height={1000}
                    className={`h-[120px] w-fit object-contain transition duration-300`}
                />
            </div>
            <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                <div className="bg-foreground h-20 w-20 rounded-full opacity-40 blur-lg"></div>
            </div>
        </div>
    );
}
