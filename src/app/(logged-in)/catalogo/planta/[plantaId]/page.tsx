import { Repositories } from '@/shared/api/repositories';
import Link from 'next/link';

export default async function PlantaPage({
    params,
}: {
    params: Promise<{ plantaId: string }>;
}) {
    const { plantaId } = await params;
    const planta = await Repositories.plantas.getPlanta(Number(plantaId));

    return (
        <>
            <div className="flex flex-col gap-1">
                <Link
                    href="/catalogo"
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                >
                    <i className="ph ph-arrow-left" />
                    <p className="text-base">Voltar</p>
                </Link>
                <h2 className="text-2xl font-medium">{planta.data.nome}</h2>
            </div>
            <div className="">
                <p className="text-lg font-medium">Descrição</p>
                <p className="text-muted-foreground">{planta.data.descricao}</p>
            </div>
            <div className="">
                <p className="text-lg font-medium">Dificuldade</p>
                <p className="text-muted-foreground">
                    {planta.data.dificuldade.label}
                </p>
            </div>
        </>
    );
}
