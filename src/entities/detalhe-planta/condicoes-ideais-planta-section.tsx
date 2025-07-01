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
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center text-5xl">
                    {planta.estacaoIdeal === 'Outono' && (
                        <i className="ph ph-duotone ph-leaf text-orange-400" />
                    )}
                    {planta.estacaoIdeal === 'Verão' && (
                        <i className="ph ph-duotone ph-sun text-yellow-400" />
                    )}
                    {planta.estacaoIdeal === 'Inverno' && (
                        <i className="ph ph-duotone ph-snowflake text-sky-400" />
                    )}
                    {planta.estacaoIdeal === 'Primavera' && (
                        <i className="ph ph-duotone ph-flower-lotus text-primary" />
                    )}
                    {planta.estacaoIdeal === 'Todo o ano' && (
                        <i className="ph ph-duotone ph-calendar-blank text-amber-800" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold">
                        {planta.estacaoIdeal}
                    </span>
                    <div className="mt-1 flex gap-4">
                        <span className="text-muted-foreground text-sm">
                            Mín: {planta.temperaturaMinima}°C
                        </span>
                        <span className="text-muted-foreground text-sm">
                            Máx: {planta.temperaturaMaxima}°C
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
