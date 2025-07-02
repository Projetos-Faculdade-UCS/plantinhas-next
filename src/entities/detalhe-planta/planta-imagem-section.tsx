'use client';
import { Planta } from '@/shared/types/planta.d';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import Link from 'next/link';
import { FallbackImage } from '../imgem-planta/fallback-image';
import { CopyForm } from './copy-form';

interface PlantaImagemSectionProps {
    planta: Planta;
}

export function PlantaImagemSection({ planta }: PlantaImagemSectionProps) {
    return (
        <div className="flex w-72 flex-shrink-0 flex-col items-center">
            <FallbackImage
                fallbackSrc="/assets/erro-planta.png"
                fallBackMessage="Erro ao carregar a imagem"
                src={planta.foto!}
                alt={`Foto da planta ${planta.nome}`}
                width={288}
                height={288}
                className="rounded-lg object-cover"
            />
            <div className="mt-4 flex w-full items-center gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            type="button"
                            variant="default"
                            className="bg-primary flex h-10 min-h-0 w-10 min-w-0 cursor-pointer items-center justify-center rounded-lg p-0"
                            aria-label="Compartilhar"
                        >
                            <i className="ph ph-share-network text-xl text-white"></i>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Compartilhar link</DialogTitle>
                            <DialogDescription>
                                Qualquer pessoa com este link poderá visualizar
                                esta página.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <CopyForm />
                        </div>
                    </DialogContent>
                </Dialog>
                <Button
                    asChild
                    variant={'default'}
                    className="bg-primary flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg text-base"
                >
                    <Link href="/plantar">
                        <i className="ph-duotone ph-potted-plant text-xl"></i>
                        <span className="text-base">Plantar</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
