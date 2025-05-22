import { PlantioPreview } from '@/shared/types/plantio';

type IndicadorSaudeProps = {
    saude: PlantioPreview['saude'];
};
export function IndicadorSaude({ saude }: IndicadorSaudeProps) {
    const saudeDeg = saude.value * 360;
    const isZero = saude.value < 0.005;
    const isFull = saude.value === 1;

    const saudeColor = isFull ? '#eab308' : 'var(--destructive)';
    return (
        <div className="bg-card relative flex h-10 w-10 items-center justify-center rounded-full">
            <div
                className={`absolute inset-0 rounded-full`}
                style={{
                    background: `conic-gradient(${saudeColor} ${saudeDeg}deg, var(--muted) 0deg)`,
                }}
            />
            <div className="bg-card absolute flex h-8 w-8 items-center justify-center rounded-full">
                <i
                    className={`ph-duotone ph-heartbeat flex text-2xl ${isZero ? 'text-muted-foreground' : isFull ? 'text-yellow-500' : 'text-destructive'}`}
                ></i>
            </div>
        </div>
    );
}
