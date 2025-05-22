import { Repositories } from '@/shared/api/repositories';
import { use } from 'react';

export default function PlantioPage({
    params,
}: {
    params: Promise<{ plantioId: string }>;
}) {
    const plantioId = Number(use(params).plantioId);
    const plantio = use(Repositories.plantios.getPlantio(plantioId));
    return (
        <div className="flex h-full w-full flex-col">
            Minha {plantio.data.planta.nome}
        </div>
    );
}
