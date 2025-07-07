'use client';
import { getPlantaById } from '@/shared/api/actions/plantas';
import { Skeleton } from '@/shared/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export function ResumoPlanta({ plantaId }: { plantaId: number }) {
    const {
        data: planta,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['planta', plantaId],
        queryFn: async () => {
            const planta = await getPlantaById(plantaId);
            if (planta.error || !planta.data) {
                throw new Error(planta.error);
            }
            return planta.data;
        },
        staleTime: 60 * 1000, // 1 minuto
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError: false,
    });
    if (isLoading) {
        return (
            <div className="flex flex-col gap-1">
                <Skeleton className="mb-2 h-6 w-42" />
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-4" />
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Erro ao carregar planta</h1>
                <p className="text-destructive">{error.message}</p>
            </div>
        );
    }
    if (!planta) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Planta não encontrada</h1>
                <p className="text-muted-foreground">
                    Não foi possível encontrar a planta com ID {plantaId}.
                </p>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{planta.nome}</h1>
            <div className="text-muted-foreground flex items-center gap-2">
                <span className="italic">{planta.nomeCientifico}</span>
                <Link href={`/catalogo/planta/${planta.id}`} className="">
                    <i className="ph ph-arrow-square-out flex" />
                </Link>
            </div>
        </div>
    );
}
