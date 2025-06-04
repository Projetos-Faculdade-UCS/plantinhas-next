import { HeaderIndicadores } from '@/entities/detalhe-plantio/header-indicadores';
import { Repositories } from '@/shared/api/repositories';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export default function PlantioPage({
    params,
}: {
    params: Promise<{ plantioId: string }>;
}) {
    const plantioId = Number(use(params).plantioId);
    const { data: plantio } = use(Repositories.plantios.getPlantio(plantioId));

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex gap-12">
                <Image
                    src={plantio.planta.foto || '/assets/plantas/girassol.png'}
                    alt={plantio.planta.nome}
                    width={1000}
                    height={1000}
                    className={`h-[240px] w-fit object-contain`}
                />
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <Link
                            href={`/jardim/`}
                            className="text-muted-foreground flex items-center gap-2 text-sm"
                        >
                            <i className="ph ph-arrow-left flex" />
                            <p className="text-base">Voltar</p>
                        </Link>
                        <h1 className="text-2xl font-bold">
                            {plantio.planta.nome}
                        </h1>
                        <div className="text-muted-foreground flex items-center gap-2">
                            <span className="italic">Cientificus</span>
                            <Link
                                href={`/catalogo/planta/${plantio.planta.id}`}
                                className=""
                            >
                                <i className="ph ph-arrow-square-out flex" />
                            </Link>
                        </div>
                    </div>
                    <HeaderIndicadores
                        situacao={plantio.situacao}
                        saude={plantio.saude}
                        sede={plantio.sede}
                    />
                </div>
            </div>
        </div>
    );
}
