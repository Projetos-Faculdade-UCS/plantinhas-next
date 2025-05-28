import { PlantioPreview } from '@/shared/types/plantio';

type IndicadorSituacaoProps = {
    situacao: PlantioPreview['situacao'];
    monoColor?: boolean;
};
export function IndicadorSituacao({
    situacao,
    monoColor,
}: IndicadorSituacaoProps) {
    const isZero = situacao.value == 0;
    const isOver = situacao.value > 1;
    const isFull = situacao.value === 1;

    const dashColor = isFull
        ? 'var(--secondary)'
        : monoColor
          ? 'var(--primary-foreground)'
          : 'var(--primary)'; // cor principal

    return (
        <div className="flex w-[70%] shrink flex-col gap-1">
            <span
                className="text-primary-foreground truncate text-lg font-medium"
                style={{
                    color: dashColor,
                }}
            >
                {situacao.label}
            </span>
            <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, index) => {
                    const isActive = situacao.value * 10 > index;
                    return (
                        <div
                            key={index}
                            className={`h-2 w-5 rounded-sm border ${isActive ? 'opacity-100' : 'opacity-40'}`}
                            style={{
                                backgroundColor: dashColor,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
