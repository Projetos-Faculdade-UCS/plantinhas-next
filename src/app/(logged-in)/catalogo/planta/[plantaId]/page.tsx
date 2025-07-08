import { CondicoesIdeaisPlantaSection } from '@/entities/detalhe-planta/condicoes-ideais-planta-section';
import { DificuldadePlantaSection } from '@/entities/detalhe-planta/dificuldade-planta-section';
import { IdentificacaoPlantaSection } from '@/entities/detalhe-planta/identificacao-planta-section';
import { PlantaImagemSection } from '@/entities/detalhe-planta/planta-imagem-section';
import { VoltarButton } from '@/entities/detalhe-planta/voltar-button';
import { Repositories } from '@/shared/api/repositories';

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
                <VoltarButton />
            </div>
            <div className="mt-4 mb-25 flex flex-col items-center gap-8 md:mb-0 md:flex-row md:items-start">
                <PlantaImagemSection planta={planta.data} />
                <div className="flex flex-1 flex-col gap-8">
                    <IdentificacaoPlantaSection planta={planta.data} />
                    <DificuldadePlantaSection planta={planta.data} />
                    <CondicoesIdeaisPlantaSection planta={planta.data} />
                </div>
            </div>
        </>
    );
}
