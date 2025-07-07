'use client';

import { getPlantaById } from '@/shared/api/actions/plantas';
import { itim } from '@/shared/lib/utils';
import { PlantaPreview } from '@/shared/types/planta';
import { Skeleton } from '@/shared/ui/skeleton';
import { useEffect, useState } from 'react';

export function NomePlanta({ plantaId }: { plantaId: number }) {
    const [planta, setPlanta] = useState<PlantaPreview | null>(null);

    useEffect(() => {
        getPlantaById(plantaId).then((planta) => {
            if (planta.data) {
                setPlanta(planta.data);
            } else {
                setPlanta(null);
            }
        });
    }, [plantaId]);

    if (!planta) return <Skeleton className="mx-4 h-6 w-full" />;

    return (
        <span className={`z-[1] w-full text-center text-xl ${itim.className}`}>
            {planta.nome}
        </span>
    );
}
