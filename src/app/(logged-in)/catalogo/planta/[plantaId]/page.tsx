import { CondicoesIdeaisPlantaSection } from '@/entities/detalhe-planta/condicoes-ideais-planta-section';
import { DificuldadePlantaSection } from '@/entities/detalhe-planta/dificuldade-planta-section';
import { IdentificacaoPlantaSection } from '@/entities/detalhe-planta/identificacao-planta-section';
import { PlantaImagemSection } from '@/entities/detalhe-planta/planta-imagem-section';
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
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-4 mb-25 md:mb-0 items-center md:items-start">
                <PlantaImagemSection planta={planta.data} />
                <div className="flex-1 flex flex-col gap-8">
                    <IdentificacaoPlantaSection planta={planta.data} />
                    <DificuldadePlantaSection planta={planta.data} />
                    <CondicoesIdeaisPlantaSection planta={planta.data} />
                </div>
            </div>
        </>
    );
}
