import { HeaderIndicadores } from '@/entities/detalhe-plantio/header-indicadores';
import { Repositories } from '@/shared/api/repositories';
import { Button } from '@/shared/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

function getTimeAgo(dateString: string | undefined): string {
    if (!dateString) return 'Nunca';
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ptBR });
}

export default function PlantioPage({
    params,
}: {
    params: Promise<{ plantioId: string }>;
}) {
    const plantioId = Number(use(params).plantioId);
    const { data: plantio } = use(Repositories.plantios.getPlantio(plantioId));
    const tarefas = use(Repositories.plantios.getTarefasPlantio(plantioId));

    const tarefasMapeadas = tarefas.map((tarefa) => ({
        ...tarefa,
        timeAgo: getTimeAgo(tarefa.ultimaAlteracao),
    }));

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
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Tarefas</h2>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Coluna da esquerda: Tarefas */}
                    <div className="w-full md:w-[calc(100%-420px)] flex flex-col gap-4">
                        {tarefas.length === 0 && (
                            <div className="rounded-md bg-[#FFFFFF] border border-[#D4D4D4] px-4 py-2">
                                <div className="w-full cursor-default flex items-center px-4 py-3">
                                    <span className="text-muted-foreground text-sm">Nenhuma tarefa encontrada.</span>
                                </div>
                            </div>
                        )}
                        {tarefasMapeadas.map((tarefa) => (
                            <div
                                key={tarefa.id}
                                className="rounded-lg bg-[#FFFFFF] border border-[#D4D4D4] px-4 py-2"
                            >
                                <div className="w-full flex flex-row items-center justify-between py-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-base leading-tight">{tarefa.nome}</span>
                                        <span className="text-xs text-muted-foreground leading-none">{tarefa.status}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-4 whitespace-nowrap">{tarefa.timeAgo}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Coluna da direita: Tutorial da Tarefa */}
                    <div
                        className="hidden md:flex flex-col min-h-[200px] w-[400px] max-w-[400px] sticky top-8 right-0 border border-[#D4D4D4] bg-[#FFFFFF] rounded-xl shadow-lg p-6 gap-6 z-10 animate-fade-in"
                        style={{ height: 'fit-content' }}
                    >
                        {/* Botões de concluir e fechar */}
                        <div className="flex items-center justify-between mb-2">
                            <Button
                                asChild
                                variant={'default'}
                                size={'sm'}
                                className="flex items-center justify-center text-base bg-primary cursor-pointer"
                                disabled={!tarefas[0]?.podeConcluirTarefa}
                            >
                                <span className="text-base">Concluir</span>
                            </Button>
                            <button
                                type="button"
                                className="flex items-center justify-center w-8 h-8 cursor-pointer"
                                title="Fechar"
                            >
                                <i className="ph ph-x text-xl text-muted-foreground" />
                            </button>
                        </div>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                            <i className="ph ph-book-open text-4xl" /> {tarefas[0]?.nome || 'Tarefa'}
                        </h3>
                        {/* Informações principais da tarefa */}
                        <div className="flex flex-col gap-4 mb-2">
                            <div className="flex items-center gap-2">
                                <i className="ph ph-calendar-check text-lg text-muted-foreground" />
                                <span className="font-semibold text-muted-foreground">Frequência:</span>
                                <span className="ml-1 text-base font-medium">{tarefas[0]?.frequencia}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ph ph-barbell text-lg text-muted-foreground" />
                                <span className="font-semibold text-muted-foreground">Progresso:</span>
                                <span className="ml-1 text-base font-medium">{tarefas[0]?.quantidadeCompletada} de {tarefas[0]?.quantidadeTotal}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ph ph-clock text-lg text-muted-foreground" />
                                <span className="font-semibold text-muted-foreground">Última alteração:</span>
                                <span className="ml-1 text-base font-medium">{tarefas[0]?.ultimaAlteracao}</span>
                            </div>
                        </div>
                        {/* Subtítulo do tutorial - separador visual simples */}
                        <div className="text-lg font-semibold mt-2">
                            Tutorial da Tarefa
                        </div>
                        {/* Materiais */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <i className="ph ph-toolbox text-lg text-muted-foreground" />
                                <span className="font-semibold text-muted-foreground">Materiais necessários</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {tarefas[0]?.tutorial?.materiais?.map((mat, idx) => (
                                    <div key={idx} className="flex gap-2 text-base">
                                        <span className="text-base">{mat.nome}</span>
                                        <span className="text-base text-muted-foreground">{mat.quantidade} {mat.unidade}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Etapas */}
                        <div>
                            <div className="flex items-center gap-2 mb-2 mt-4">
                                <i className="ph ph-list-numbers text-lg text-muted-foreground" />
                                <span className="font-semibold text-muted-foreground">Etapas</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {tarefas[0]?.tutorial?.etapas?.map((etapa, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-base">
                                        <span className="font-bold text-xs text-muted-foreground">{idx + 1}.</span>
                                        <span>{etapa.descricao}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
