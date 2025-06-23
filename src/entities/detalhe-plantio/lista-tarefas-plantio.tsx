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
            <div className="w-full md:w-[calc(100%-420px)] flex flex-col gap-4">
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
                        className={`rounded-lg border px-4 py-2 cursor-pointer transition-colors 
                            ${selectedIdx === idx ? 'border-primary bg-primary-foreground' : 'border-[#D4D4D4] bg-[#FFFFFF]'}
                        `}
                        onClick={() => setSelectedIdx(idx)}
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
                {tarefas[selectedIdx] && <DetalheTarefa tarefa={tarefas[selectedIdx]} />}
            </div>
        </div>
    );
}
