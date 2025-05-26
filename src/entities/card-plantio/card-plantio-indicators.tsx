import { PlantioPreview } from '@/shared/types/plantio';
import { IndicadorSaude } from './indicador-saude';
import { IndicadorSede } from './indicador-sede';
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
            className={`bg-primary border-border-primary flex shrink-0 items-center justify-around rounded-b-md border-x border-b px-4 py-2`}
        >
            {active && (
                <>
                    <IndicadorSituacao situacao={plantio.situacao} monoColor />
                    <IndicadorSaude saude={plantio.saude} monoColor />
                    <IndicadorSede sede={plantio.sede} monoColor />
                </>
            )}
            {isOver && (
                <div className="text-primary-foreground flex h-10 items-center justify-center gap-2">
                    <i className="ph ph-basket text-2xl"></i>
                    <span className="font-medium">
                        {plantio.situacao.label}
                    </span>
                </div>
            )}
            {notBegun && (
                <div className="text-primary-foreground flex h-10 items-center justify-center gap-2">
                    <i className="ph ph-shovel text-2xl"></i>
                    <span className="font-medium">Plantar</span>
                </div>
            )}
        </div>
    );
}
