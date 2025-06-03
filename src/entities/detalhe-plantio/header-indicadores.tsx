import { Plantio } from '@/shared/types/plantio';
import { Tile } from '@/shared/ui/tile';
import { IndicadorSaude } from '../card-plantio/indicador-saude';
import { IndicadorSede } from '../card-plantio/indicador-sede';
import { IndicadorSituacao } from '../card-plantio/indicador-situacao';

type HeaderIndicadoresProps = {
    situacao: Plantio['situacao'];
    saude: Plantio['saude'];
    sede: Plantio['sede'];
};

export function HeaderIndicadores({
    situacao,
    saude,
    sede,
}: HeaderIndicadoresProps) {
    const isZero = situacao.value == 0;
    const isOver = situacao.value > 1;
    const empty = isZero || isOver;
    return (
        <div className="flex gap-12">
            <div className={'flex items-center gap-2'}>
                <div className="relative overflow-hidden rounded-full p-2">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            background: 'var(--primary)',
                        }}
                    ></div>
                    <i
                        className={`ph-duotone ${isZero ? 'ph-shovel' : isOver ? 'ph-basket' : 'ph-plant'} text-primary flex text-2xl`}
                        style={{
                            color: 'var(--primary)',
                        }}
                    ></i>
                </div>
                <IndicadorSituacao situacao={situacao} withDashes={!empty} />
            </div>
            <Tile
                leading={<IndicadorSaude saude={saude} withRing={!empty} />}
                title="Saúde"
                value={empty ? '-' : saude.label}
            />
            <Tile
                leading={<IndicadorSede sede={sede} withRing={!empty} />}
                title="Sede"
                value={empty ? '-' : sede.label}
            />
        </div>
    );
}
