import { PlantioPreview } from '@/shared/types/plantio';
import { IndicadorSaude } from './indicador-saude';
import { IndicadorSituacao } from './indicador-situacao';

type CardPlantioIncatorsProps = {
    plantio: PlantioPreview;
};
export function CardPlantioIncators({ plantio }: CardPlantioIncatorsProps) {
    const notBegun = plantio.situacao.value === 0;
    const active = plantio.situacao.value > 0 && plantio.situacao.value <= 1;
    const isOver = plantio.situacao.value > 1;

    return (
        <div
            className={`to-primary border-border-primary flex w-full shrink-0 items-center justify-between gap-4 rounded-b-md border-x border-b bg-linear-to-t from-[#35602A] px-2 py-2`}
        >
            {active && (
                <>
                    <IndicadorSituacao situacao={plantio.situacao} monoColor />
                    <IndicadorSaude saude={plantio.saude} monoColor />
                </>
            )}
            {isOver && (
                <div className="text-primary-foreground flex h-10 w-full items-center justify-center gap-2">
                    <i className="ph ph-basket text-2xl"></i>
                    <span className="text-lg font-medium">
                        {plantio.situacao.label}
                    </span>
                </div>
            )}
            {notBegun && (
                <div className="text-primary-foreground flex h-10 w-full items-center justify-center gap-2">
                    <i className="ph ph-shovel text-2xl"></i>
                    <span className="text-lg font-medium">Plantar</span>
                </div>
            )}
        </div>
    );
}
