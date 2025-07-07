import { getDetalheTarefa } from '@/shared/api/actions/tarefas';
import { TarefaPlantio, TarefaPlantioPreview } from '@/shared/types/tarefa';
import { Button } from '@/shared/ui/button';
import { useEffect, useState } from 'react';

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

    const formatarData = (data: string | Date): string => {
        const dataObj = typeof data === 'string' ? new Date(data) : data;

        if (isNaN(dataObj.getTime())) {
            return data.toString();
        }

        return dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
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
                <span className="text-destructive">{error}</span>
            </div>
        );
    }
    return (
        <div className="flex h-[530px] flex-col">
            {/* Header fixo com botão fechar e título */}
            <div className="flex-shrink-0 border-b">
                <div className="mb-3 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold">{tarefa.nome}</h3>
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

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <i className="ph ph-calendar-check text-muted-foreground text-lg" />
                        <span className="text-muted-foreground font-semibold">
                            Frequência:
                        </span>
                        <span className="ml-1 text-base font-medium">
                            {tarefaDetail.frequencia}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ph ph-barbell text-muted-foreground text-lg" />
                        <span className="text-muted-foreground font-semibold">
                            Progresso:
                        </span>
                        <span className="ml-1 text-base font-medium">
                            {tarefa.quantidadeCompletada} de{' '}
                            {tarefa.quantidadeTotal}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ph ph-clock text-muted-foreground text-lg" />
                        <span className="text-muted-foreground font-semibold">
                            Última alteração:
                        </span>
                        <span className="ml-1 text-base font-medium">
                            {formatarData(tarefa.ultimaAlteracao)}
                        </span>
                    </div>
                </div>

                <div className="mt-6 mb-4 text-lg font-semibold">
                    Como fazer?
                </div>

                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2">
                        <i className="ph ph-toolbox text-muted-foreground text-lg" />
                        <span className="text-muted-foreground font-semibold">
                            Materiais necessários
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {tarefaDetail.tutorial.materiais.map((mat, idx) => (
                            <div key={idx} className="flex gap-2 text-base">
                                <span className="text-base">{mat.nome}</span>
                                <span className="text-muted-foreground text-base">
                                    {formatarQuantidade(mat.quantidade)}{' '}
                                    {mat.unidade}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <i className="ph ph-list-numbers text-muted-foreground text-lg" />
                        <span className="text-muted-foreground font-semibold">
                            Etapas
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {tarefaDetail.tutorial.etapas
                            .sort((a, b) => a.ordem - b.ordem)
                            .map((etapa, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 text-base"
                                >
                                    <span className="text-muted-foreground text-xs font-bold">
                                        {idx + 1}.
                                    </span>
                                    <span>{etapa.descricao}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Botão sticky na parte inferior */}
            <div className="flex-shrink-0">
                <Button
                    variant="default"
                    className="bg-primary h-10 w-full text-base"
                >
                    <span className="text-base">Concluir</span>
                </Button>
            </div>
        </div>
    );
}
