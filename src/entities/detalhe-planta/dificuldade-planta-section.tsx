import { Planta } from '@/shared/types/planta.d';
import Image from 'next/image';

interface DificuldadePlantaSectionProps {
  planta: Planta;
}

export function DificuldadePlantaSection({ planta }: DificuldadePlantaSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-4">
        <span className="text-5xl font-bold">
          {planta.dificuldade.value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </span>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground tracking-wider">Dificuldade</span>
          <span className="text-lg font-semibold">{planta.dificuldade.label}</span>
        </div>
      </div>
      {/* Indicadores de dificuldade */}
      <div className="flex gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, idx) => {
          const value = planta.dificuldade.value - idx;
          let svgName = '0.svg';
          if (value >= 0.85) svgName = '1.svg';
          else if (value >= 0.5) svgName = '0.7.svg';
          else if (value >= 0.15) svgName = '0.3.svg';
          return (
            <Image
              key={idx}
              src={`/assets/indicadores-dificuldade/${svgName}`}
              width={32}
              height={32}
              className="select-none"
              draggable={false}
              alt=""
            />
          );
        })}
      </div>
    </section>
  );
}
