import { Skeleton } from '@/shared/ui/skeleton';
import Image from 'next/image';
import { Ondulacao } from './ondulacao';

export function CardPlantaSkeleton() {
    return (
        <div className="relative w-[9.5rem] shrink-0">
            <div className={`flex h-full flex-col`}>
                <div className="h-8"></div>
                <Ondulacao />
                <div className="bg-card h-8 border-x"></div>
                <div className="bg-card flex justify-center gap-2 border-x pt-1 pb-3">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>
                <div
                    className={`bg-muted-foreground flex h-10 shrink-0 items-center justify-between rounded-b-md border border-x border-b px-4 transition duration-300`}
                >
                    <Skeleton className="bg-muted h-4 w-1/2 rounded-md" />

                    <Skeleton className="bg-muted h-4 w-1/5 rounded-md" />
                </div>
            </div>
            <div className="absolute top-0 left-0 z-[1] flex w-full justify-center">
                <Image
                    src="/assets/plantas/girassol.png"
                    alt={'Sem imagem'}
                    width={1000}
                    height={1000}
                    className={`h-[120px] w-full object-contain grayscale transition duration-300`}
                />
            </div>
            <div className="absolute top-0 left-0 z-[0] mt-12 flex w-full justify-center">
                <div className="bg-foreground h-20 w-20 rounded-full opacity-40 blur-lg"></div>
            </div>
        </div>
    );
}
