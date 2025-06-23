import { TarefaPlantio } from '@/shared/types/plantio';
import { Button } from '@/shared/ui/button';

interface DetalheTarefaProps {
    tarefa: TarefaPlantio;
}

export function DetalheTarefa({ tarefa }: DetalheTarefaProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <Button variant="default" size="sm" className="flex items-center justify-center text-base bg-primary cursor-pointer">
                    <span className="text-base">Concluir</span>
                </Button>
                <button type="button" className="flex items-center justify-center w-8 h-8 cursor-pointer" title="Fechar">
                    <i className="ph ph-x text-xl text-muted-foreground" />
                </button>
            </div>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                <i className="ph ph-book-open text-4xl" /> {tarefa.nome}
            </h3>
            <div className="flex flex-col gap-4 mb-2">
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
                    <span className="ml-1 text-base font-medium">{tarefa.ultimaAlteracao}</span>
                </div>
            </div>
            <div className="text-lg font-semibold mt-2">Tutorial da Tarefa</div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <i className="ph ph-toolbox text-lg text-muted-foreground" />
                    <span className="font-semibold text-muted-foreground">Materiais necessários</span>
                </div>
                <div className="flex flex-col gap-1">
                    {tarefa.tutorial.materiais.map((mat, idx) => (
                        <div key={idx} className="flex gap-2 text-base">
                            <span className="text-base">{mat.nome}</span>
                            <span className="text-base text-muted-foreground">{mat.quantidade} {mat.unidade}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-2 mt-4">
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
    );
}
