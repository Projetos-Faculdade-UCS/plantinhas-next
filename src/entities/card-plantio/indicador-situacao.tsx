import { cn } from '@/shared/lib/utils';
import { PlantioPreview } from '@/shared/types/plantio';

type IndicadorSituacaoProps = {
    situacao: PlantioPreview['situacao'];
    monoColor?: boolean;
    className?: string;
    withDashes?: boolean;
};
export function IndicadorSituacao({
    situacao,
    monoColor,
    className,
    withDashes = true,
}: IndicadorSituacaoProps) {
    const isFull = situacao.value === 1;

    const dashColor = isFull
        ? 'var(--secondary)'
        : monoColor
          ? 'var(--primary-foreground)'
          : 'var(--primary)'; // cor principal

    return (
        <div className={cn('flex shrink flex-col gap-1', className)}>
            <span
                className="text-primary-foreground truncate text-lg font-medium"
                style={{
                    color: monoColor
                        ? 'var(--primary-foreground)'
                        : 'var(--foreground)',
                }}
            >
                {situacao.label}
            </span>
            {withDashes && (
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
            )}
        </div>
    );
}
