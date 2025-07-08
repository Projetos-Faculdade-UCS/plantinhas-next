import { getDetalheTarefa } from '@/shared/api/actions/tarefas';
import { capitalize } from '@/shared/lib/utils';
import { TarefaPlantio, TarefaPlantioPreview } from '@/shared/types/tarefa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getTarefaImage } from '../card-tarefa/lib/utils';
import { RealizarTarefaBtn } from './realizar-tarefa-btn';
import styles from './style.module.scss';

interface DetalheTarefaProps {
    tarefa: TarefaPlantioPreview & { timeAgo?: string };
}

export function DetalheTarefa({ tarefa }: DetalheTarefaProps) {
    const [tarefaDetail, setTarefaDetail] = useState<TarefaPlantio>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDetalheTarefa(tarefa.id).then((response) => {
            if (response.data) {
                setTarefaDetail(response.data);
            } else {
                setError(response.error);
            }
        });
    }, [tarefa]);

    const formatarQuantidade = (quantidade: number | string): string => {
        const numero =
            typeof quantidade === 'number'
                ? quantidade
                : parseFloat(quantidade) || 0;
        return numero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    if (!tarefaDetail) {
        return (
            <div className="flex h-full items-center justify-center">
                <span className="text-muted-foreground">Carregando...</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex h-full items-center justify-center">
                <span className="text-destructive">
                    Ocorreu um erro ao carregar os detalhes da tarefa.
                    <br />
                    Tente novamente mais tarde.
                </span>
            </div>
        );
    }
    return (
        <div className="flex h-full flex-col">
            {/* Header fixo com botão fechar e título */}
            <div
                className="bg-muted z-[10] flex items-center gap-2 border-b px-4 py-2 shadow-sm"
                // style={{ backgroundColor: getBgColor(tarefaDetail.tipo) }}
            >
                <div className="flex h-12 w-12 items-center justify-center">
                    <Image
                        src={getTarefaImage(tarefa.tipo)}
                        alt={tarefa.nome}
                        width={45}
                        height={45}
                        className="h-full w-fit rounded-md object-contain"
                    />
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold">{tarefa.nome}</h3>
                        <span className="text-muted-foreground text-xs">
                            {tarefa.timeAgo}
                        </span>
                    </div>

                    <button
                        type="button"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center"
                        title="Fechar"
                    >
                        <i className="ph ph-x text-muted-foreground text-xl" />
                    </button>
                </div>
            </div>
            <div className="flex h-full flex-col justify-between">
                {/* Conteúdo scrollável */}
                <div
                    className={`flex flex-col gap-5 py-4 ${styles.list} h-full max-h-[280px] shrink-0 px-4`}
                >
                    <div className="flex flex-wrap gap-4 sm:flex-nowrap">
                        <div className="bg-muted flex w-full items-center justify-center gap-2 rounded-md border py-1">
                            <i className="ph ph-calendar-dots text-muted-foreground text-2xl" />
                            <div className="flex flex-col">
                                <span className="text-muted-foreground text-sm">
                                    Frequência
                                </span>
                                <span className="text-base">
                                    {tarefaDetail.frequencia || 'Às vezes'}
                                </span>
                            </div>
                        </div>
                        <div className="bg-muted flex w-full items-center justify-center gap-2 rounded-md border py-1">
                            <i className="ph ph-calendar-check text-muted-foreground text-2xl" />
                            <div className="flex flex-col">
                                <span className="text-muted-foreground text-sm">
                                    Progresso
                                </span>
                                <span className="text-base">
                                    {tarefa.quantidadeCompletada} /{' '}
                                    {tarefa.quantidadeTotal}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-muted-foreground">
                                Materiais necessários
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            {tarefaDetail.tutorial.materiais.map((mat, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 text-base"
                                >
                                    <i className="ph ph-shovel text-muted-foreground flex text-base" />
                                    <span className="shrink-0 text-base">
                                        {capitalize(mat.nome)}
                                    </span>
                                    <span className="text-muted-foreground w-full text-end">
                                        {formatarQuantidade(mat.quantidade)}{' '}
                                        {mat.unidade}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-0">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-muted-foreground">
                                Tutorial
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            {tarefaDetail.tutorial.etapas
                                .sort((a, b) => a.ordem - b.ordem)
                                .map((etapa, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-2 text-base"
                                    >
                                        <span className="text-muted-foreground mt-1 text-sm">
                                            {idx + 1}.
                                        </span>
                                        <span>{etapa.descricao}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <RealizarTarefaBtn tarefa={tarefaDetail} />
            </div>
        </div>
    );
}
