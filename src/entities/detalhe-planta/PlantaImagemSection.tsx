import { Planta } from '@/shared/types/planta.d';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface PlantaImagemSectionProps {
  planta: Planta;
}

export function PlantaImagemSection({ planta }: PlantaImagemSectionProps) {
  return (
    <div className="flex-shrink-0 w-72 flex flex-col items-center">
      <Image
        src={planta.foto || '/assets/plantas/girassol.png'}
        alt={`Foto da planta ${planta.nome}`}
        width={288}
        height={288}
        className="object-cover rounded-lg"
      />
      <div className="flex w-full items-center gap-2 mt-4">
        <Button
          type="button"
          variant="default"
          className="flex items-center justify-center bg-primary w-10 h-10 min-w-0 min-h-0 rounded-lg p-0"
          aria-label="Compartilhar"
        >
          <i className="ph ph-share-network text-xl text-white"></i>
        </Button>
        <Button
          asChild
          variant={'default'}
          className="flex-1 flex items-center justify-center gap-2 text-base bg-primary h-10 min-w-0 rounded-lg"
        >
          <Link href="/plantar" >
            <i className="ph-duotone ph-potted-plant text-xl"></i>
            <span className="text-base">Plantar</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
