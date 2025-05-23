import { IndicadorSaude } from '@/entities/card-plantio/indicador-saude';
import { IndicadorSede } from '@/entities/card-plantio/indicador-sede';
import { IndicadorSituacao } from '@/entities/card-plantio/indicador-situacao';
import { Repositories } from '@/shared/api/repositories';
import { Tile } from '@/shared/ui/tile';
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

    const empty =
        plantio.situacao.label === 'Colhido' ||
        plantio.situacao.label === 'Para plantar';

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
                    <div className="flex gap-12">
                        <Tile
                            leading={
                                <IndicadorSituacao
                                    situacao={plantio.situacao}
                                />
                            }
                            title="Situação"
                            value={plantio.situacao.label}
                        />
                        <Tile
                            leading={<IndicadorSaude saude={plantio.saude} />}
                            title="Saúde"
                            value={empty ? '-' : plantio.saude.label}
                        />
                        <Tile
                            leading={<IndicadorSede sede={plantio.sede} />}
                            title="Sede"
                            value={empty ? '-' : plantio.sede.label}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
