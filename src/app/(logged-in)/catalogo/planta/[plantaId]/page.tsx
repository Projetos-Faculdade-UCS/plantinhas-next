import { PlantaRepository } from '@/shared/api/repositories/planta-repository';

export default async function PlantaPage({
    params,
}: {
    params: Promise<{ plantaId: string }>;
}) {
    const { plantaId } = await params;
    const planta = await new PlantaRepository().getPlanta(Number(plantaId));

    return (
        <div className="flex h-full w-full flex-col px-8 py-4">
            <div className="text-primary flex items-center gap-2">
                <i className="ph ph-book-bookmark text-3xl" />
                <p className="text-2xl font-medium">Planta</p>
            </div>
            <div className="flex flex-wrap">
                <h2>{planta.data.nome}</h2>
            </div>
        </div>
    );
}
