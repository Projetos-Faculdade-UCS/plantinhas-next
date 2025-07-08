import { Planta } from '@/shared/types/planta.d';

interface CondicoesIdeaisPlantaSectionProps {
    planta: Planta;
}

export function CondicoesIdeaisPlantaSection({
    planta,
}: CondicoesIdeaisPlantaSectionProps) {
    return (
        <section>
            <h3 className="text-muted-foreground text-base">
                Condições ideais
            </h3>
            <div className="flex items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center text-5xl">
                    {planta.estacaoPlantio === 'Outono' && (
                        <i className="ph-duotone ph-leaf text-orange-400" />
                    )}
                    {planta.estacaoPlantio === 'Verão' && (
                        <i className="ph-duotone ph-sun text-yellow-400" />
                    )}
                    {planta.estacaoPlantio === 'Inverno' && (
                        <i className="ph-duotone ph-snowflake text-sky-400" />
                    )}
                    {planta.estacaoPlantio === 'Primavera' && (
                        <i className="ph-duotone ph-flower-lotus text-primary" />
                    )}
                    {planta.estacaoPlantio === 'Todo o ano' && (
                        <i className="ph-duotone ph-calendar-blank text-amber-800" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold">
                        {planta.estacaoPlantio}
                    </span>
                    <div className="mt-1 flex gap-4">
                        <span className="text-muted-foreground text-sm">
                            Mín {Number(planta.temperaturaMinima).toFixed(0)}°C
                        </span>
                        <span className="text-muted-foreground text-sm">
                            Máx {Number(planta.temperaturaMaxima).toFixed(0)}°C
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
