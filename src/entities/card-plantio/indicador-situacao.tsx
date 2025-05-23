import { PlantioPreview } from '@/shared/types/plantio';

type IndicadorSituacaoProps = {
    situacao: PlantioPreview['situacao'];
    monoColor?: boolean;
};
export function IndicadorSituacao({
    situacao,
    monoColor,
}: IndicadorSituacaoProps) {
    const situacaoDeg = situacao.value * 360;
    const isZero = situacao.value == 0;
    const isOver = situacao.value > 1;
    const isFull = situacao.value === 1;

    const ringColor = isFull
        ? 'var(--secondary)'
        : monoColor
          ? 'var(--primary-foreground)'
          : 'var(--primary)'; // cor principal

    console.log('situacao', situacao);

    return (
        <div
            className="relative flex h-10 w-10 items-center justify-center rounded-full"
            style={{
                background: monoColor ? 'var(--primary)' : 'var(--card)',
            }}
        >
            <div
                className={`absolute inset-0 rounded-full`}
                style={{
                    background: `conic-gradient(${ringColor} ${situacaoDeg}deg, transparent 0deg)`,
                }}
            />
            <div
                className="z-[1] flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                    background: monoColor ? 'var(--primary)' : 'var(--card)',
                }}
            >
                <i
                    className={`ph z-[1] flex text-xl ${isOver ? 'ph-basket' : isZero ? 'ph-shovel' : 'ph-plant'}`}
                    style={{
                        color: ringColor,
                    }}
                ></i>
                <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{
                        background: ringColor,
                    }}
                ></div>
            </div>
        </div>
    );
}
