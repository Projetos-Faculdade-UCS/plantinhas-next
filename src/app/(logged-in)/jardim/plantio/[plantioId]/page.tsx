import { DeletarPlantio } from '@/entities/detalhe-plantio/deletar plantio';
import { HeaderIndicadores } from '@/entities/detalhe-plantio/header-indicadores';
import { ListaTarefasPlantio } from '@/entities/detalhe-plantio/lista-tarefas-plantio';
import { ResumoPlanta } from '@/entities/detalhe-plantio/resumo-planta';
import { FetchPlantaImage } from '@/entities/imagem/fetch-planta-image';
import { Repositories } from '@/shared/api/repositories';
import { getTimeAgo } from '@/shared/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { use } from 'react';

export default function PlantioPage({
    params,
}: {
    params: Promise<{ plantioId: string }>;
}) {
    const plantioId = Number(use(params).plantioId);
    const { data: plantio } = use(Repositories.plantios.getPlantio(plantioId));
    const tarefas = use(Repositories.tarefas.getTarefas(plantioId)).data;

    const tarefasMapeadas = tarefas.map((tarefa) => ({
        ...tarefa,
        timeAgo: getTimeAgo(tarefa.ultimaAlteracao),
    }));

    return (
        <div className="flex w-full flex-col gap-2 sm:h-[89vh]">
            <div className="flex gap-12">
                <FetchPlantaImage
                    fallbackMessage="Erro ao carregar a imagem"
                    plantaId={plantio.plantaId}
                    width={1000}
                    height={1000}
                    className={`h-[180px] w-fit object-contain`}
                />
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <Link
                            href={`/jardim/`}
                            className="text-muted-foreground flex items-center gap-2 text-sm"
                        >
                            <i className="ph ph-arrow-left flex" />
                            <p className="text-base">Voltar</p>
                        </Link>
                        <div className="flex justify-between">
                            <ResumoPlanta plantaId={plantio.plantaId} />
                            <DropdownMenu>
                                <div className="flex items-start">
                                    <DropdownMenuTrigger className="flex cursor-pointer items-center justify-center rounded-md p-2">
                                        <i className="ph ph-dots-three-vertical text-xl" />
                                    </DropdownMenuTrigger>
                                </div>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem>
                                        <i className="ph ph-pencil-simple text-base" />
                                        Editar
                                    </DropdownMenuItem>
                                    <DeletarPlantio plantioId={plantio.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <HeaderIndicadores
                        situacao={plantio.situacao}
                        saude={plantio.saude}
                        sede={plantio.sede}
                    />
                    <span className="text-muted-foreground text-sm">
                        {plantio.informacoesAdicionais}
                    </span>
                </div>
            </div>
            <div className="flex h-full flex-col gap-2">
                <h2 className="text-lg font-semibold">
                    Tarefas
                    {tarefasMapeadas.length > 0 &&
                        ` (${tarefasMapeadas.length})`}
                </h2>

                <ListaTarefasPlantio tarefas={tarefasMapeadas} />
            </div>
        </div>
    );
}
