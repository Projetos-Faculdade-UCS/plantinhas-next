import { PlantioPreview } from '@/shared/types/plantio';
import { IndicadorSaude } from './indicador-saude';
import { IndicadorSede } from './indicador-sede';
import { IndicadorSituacao } from './indicador-situacao';
import { getProgresSituacao } from './utils';

type CardPlantioIncatorsProps = {
    plantio: PlantioPreview;
};
export function CardPlantioIncators({ plantio }: CardPlantioIncatorsProps) {
    const progresSituacao = getProgresSituacao(plantio.situacao);
    console.log(
        'situacao:',
        plantio.situacao + '\t' + 'valor: ' + progresSituacao,
    );

    const notBegun = progresSituacao === 0;
    const active = progresSituacao > 0 && progresSituacao <= 1;
    const isOver = progresSituacao > 1;

    return (
        <div
            className={`bg-card flex shrink-0 items-center justify-around rounded-b-md border-x border-b px-4 py-2`}
        >
            {active && (
                <>
                    <IndicadorSituacao progresSituacao={progresSituacao} />
                    <IndicadorSaude saude={plantio.saude} />
                    <IndicadorSede sede={plantio.sede} />
                </>
            )}
            {isOver && (
                <div className="text-primary flex h-10 items-center justify-center gap-2">
                    <i className="ph ph-basket text-2xl"></i>
                    <span className="font-medium">{plantio.situacao}</span>
                </div>
            )}
            {notBegun && (
                <div className="flex h-10 items-center justify-center gap-2">
                    <i className="ph ph-shovel text-2xl"></i>
                    <span className="font-medium">{plantio.situacao}</span>
                </div>
            )}
        </div>
    );
}
