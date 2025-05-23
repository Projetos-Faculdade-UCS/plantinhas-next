import { PlantioPreview } from '@/shared/types/plantio';

type IndicadorSedeProps = {
    sede: PlantioPreview['sede'];
    monoColor?: boolean;
};
export function IndicadorSede({ sede, monoColor }: IndicadorSedeProps) {
    const sedeDeg = sede.value * 360;
    const isZero = sede.value < 0.005;
    const isFull = sede.value === 1;

    const ringColor = isFull
        ? 'var(--secondary)'
        : monoColor
          ? 'var(--primary-foreground)'
          : isZero
            ? 'var(--muted-foreground)'
            : '#1447e6'; // cor principal
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
                    background: `conic-gradient(${ringColor} ${sedeDeg}deg, transparent 0deg)`,
                }}
            />
            <div
                className="z-[1] flex h-8 w-8 items-center justify-center rounded-full"
                style={{
                    background: monoColor ? 'var(--primary)' : 'var(--card)',
                }}
            >
                <i
                    style={{
                        color: ringColor,
                    }}
                    className={`ph-duotone ph-drop flex text-2xl`}
                ></i>
                <div
                    className="absolute inset-0 rounded-full opacity-10"
                    style={{
                        background: ringColor,
                    }}
                ></div>
            </div>
        </div>
    );
}
