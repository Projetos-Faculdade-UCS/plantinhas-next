import { Planta } from '@/shared/types/planta.d';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface PlantaImagemSectionProps {
  planta: Planta;
}

export function PlantaImagemSection({ planta }: PlantaImagemSectionProps) {
  return (
    <div className="flex-shrink-0 w-56 flex flex-col items-center">
      <Image
        src={planta.foto || '/assets/plantas/girassol.png'}
        alt={`Foto da planta ${planta.nome}`}
        width={224}
        height={224}
        className="object-cover rounded-lg"
      />
      <Button
        asChild
        variant={'default'}
        className="mt-4 flex w-full items-center justify-center gap-2 text-base bg-primary"
      >
        <Link href="/plantar" >
          <i className="ph-duotone ph-potted-plant text-xl"></i>
          <span className="text-base">Plantar</span>
        </Link>
      </Button>
    </div>
  );
}
