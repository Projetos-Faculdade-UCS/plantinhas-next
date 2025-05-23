import { PlantioPreview } from '@/shared/types/plantio';

type IndicadorSedeProps = {
    sede: PlantioPreview['sede'];
};
export function IndicadorSede({ sede }: IndicadorSedeProps) {
    const sedeDeg = sede.value * 360;
    const isZero = sede.value < 0.005;
    const isFull = sede.value === 1;

    const sedeColor = isFull ? '#eab308' : '#1447e6';
    return (
        <div className="bg-card relative flex h-10 w-10 items-center justify-center rounded-full">
            <div
                className={`absolute inset-0 rounded-full`}
                style={{
                    background: `conic-gradient(${sedeColor} ${sedeDeg}deg, var(--muted) 0deg)`,
                }}
            />
            <div className="bg-card z-[1] flex h-8 w-8 items-center justify-center rounded-full">
                <i
                    className={`ph-duotone ph-drop flex text-2xl ${isZero ? 'text-muted-foreground' : isFull ? 'text-yellow-500' : 'text-blue-700'}`}
                ></i>
            </div>
        </div>
    );
}
