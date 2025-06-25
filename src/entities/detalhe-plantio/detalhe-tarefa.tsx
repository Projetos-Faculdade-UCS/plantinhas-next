import { TarefaPlantio } from '@/shared/types/plantio';
import { Button } from '@/shared/ui/button';

interface DetalheTarefaProps {
    tarefa: TarefaPlantio;
}

export function DetalheTarefa({ tarefa }: DetalheTarefaProps) {
    const formatarQuantidade = (quantidade: number | string): string => {
        const numero = typeof quantidade === 'number' ? quantidade : parseFloat(quantidade) || 0;
        return numero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
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
            minute: '2-digit'
        });
    };

    return (
        <div className="flex flex-col h-[530px]">
            {/* Header fixo com botão fechar e título */}
            <div className="flex-shrink-0 border-b">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        {tarefa.nome}
                    </h3>
                    <button type="button" className="flex items-center justify-center w-8 h-8 cursor-pointer" title="Fechar">
                        <i className="ph ph-x text-xl text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Conteúdo scrollável */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <i className="ph ph-calendar-check text-lg text-muted-foreground" />
                        <span className="font-semibold text-muted-foreground">Frequência:</span>
                        <span className="ml-1 text-base font-medium">{tarefa.frequencia}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ph ph-barbell text-lg text-muted-foreground" />
                        <span className="font-semibold text-muted-foreground">Progresso:</span>
                        <span className="ml-1 text-base font-medium">{tarefa.quantidadeCompletada} de {tarefa.quantidadeTotal}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ph ph-clock text-lg text-muted-foreground" />
                        <span className="font-semibold text-muted-foreground">Última alteração:</span>
                        <span className="ml-1 text-base font-medium">{formatarData(tarefa.ultimaAlteracao)}</span>
                    </div>
                </div>

                <div className="text-lg font-semibold mt-6 mb-4">Como fazer?</div>

                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="ph ph-toolbox text-lg text-muted-foreground" />
                        <span className="font-semibold text-muted-foreground">Materiais necessários</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {tarefa.tutorial.materiais.map((mat, idx) => (
                            <div key={idx} className="flex gap-2 text-base">
                                <span className="text-base">{mat.nome}</span>
                                <span className="text-base text-muted-foreground">{formatarQuantidade(mat.quantidade)} {mat.unidade}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <i className="ph ph-list-numbers text-lg text-muted-foreground" />
                        <span className="font-semibold text-muted-foreground">Etapas</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        {tarefa.tutorial.etapas
                            .sort((a, b) => a.ordem - b.ordem)
                            .map((etapa, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-base">
                                    <span className="font-bold text-xs text-muted-foreground">{idx + 1}.</span>
                                    <span>{etapa.descricao}</span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Botão sticky na parte inferior */}
            <div className="flex-shrink-0">
                <Button variant="default" className="w-full h-10 text-base bg-primary ">
                    <span className="text-base">Concluir</span>
                </Button>
            </div>
        </div>
    );
}
