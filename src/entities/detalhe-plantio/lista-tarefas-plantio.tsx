'use client'
import { DetalheTarefa } from '@/entities/detalhe-plantio/detalhe-tarefa';
import { TarefaPlantio } from '@/shared/types/plantio';
import { useState } from 'react';

interface ListaTarefasPlantioProps {
    tarefas: (TarefaPlantio & { timeAgo?: string })[];
}

export function ListaTarefasPlantio({ tarefas }: ListaTarefasPlantioProps) {
    const [selectedIdx, setSelectedIdx] = useState(0);

    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Coluna da esquerda: Tarefas */}
            <div className="w-full md:w-[calc(100%-420px)] flex flex-col gap-4 h-[530px] overflow-y-auto">
                {tarefas.length === 0 && (
                    <div className="rounded-md bg-[#FFFFFF] border border-[#D4D4D4] px-4 py-2">
                        <div className="w-full cursor-default flex items-center px-4 py-3">
                            <span className="text-muted-foreground text-sm">Nenhuma tarefa encontrada.</span>
                        </div>
                    </div>
                )}
                {tarefas.map((tarefa, idx) => (
                    <div
                        key={tarefa.id}
                        className={`rounded-lg border-2 px-4 py-2 cursor-pointer transition-colors 
                            ${selectedIdx === idx ? 'border-primary bg-primary-foreground' : 'border-[#D4D4D4] bg-[#FFFFFF]'}
                        `}
                        onClick={() => setSelectedIdx(idx)}
                    >
                        <div className="w-full flex flex-row items-center justify-between py-3">
                            <div className="w-full flex flex-col justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-base leading-tight">{tarefa.nome}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ph ph-barbell text-lg text-muted-foreground" />
                                    <span className="font-semibold text-muted-foreground">Progresso:</span>
                                    <span className="ml-1 text-base font-medium">{tarefa.quantidadeCompletada} de {tarefa.quantidadeTotal}</span>
                                </div>
                            </div>
                            <i className="ph ph-caret-right text-lg text-muted-foreground" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Coluna da direita: Tutorial da Tarefa */}
            <div
                className="hidden md:flex flex-col min-h-[200px] w-[400px] max-w-[400px] sticky top-8 right-0 border border-[#D4D4D4] bg-[#FFFFFF] rounded-xl shadow-lg p-6 gap-6 z-10 animate-fade-in"
                style={{ height: 'fit-content' }}
            >
                {tarefas[selectedIdx] && <DetalheTarefa tarefa={tarefas[selectedIdx]} />}
            </div>
        </div>
    );
}
