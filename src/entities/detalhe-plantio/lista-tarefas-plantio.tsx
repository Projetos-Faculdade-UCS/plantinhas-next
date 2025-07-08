'use client';
import { TarefaPlantioPreview } from '@/shared/types/tarefa';
import { useState } from 'react';
import { CardTarefa } from '../card-tarefa';
import { DetalheTarefa } from './detalhe-tarefa';
import styles from './style.module.scss';
interface ListaTarefasPlantioProps {
    tarefas: (TarefaPlantioPreview & { timeAgo?: string })[];
}

export function ListaTarefasPlantio({ tarefas }: ListaTarefasPlantioProps) {
    const [selectedIdx, setSelectedIdx] = useState(0);

    return (
        <div className="flex h-full w-full flex-col gap-4 md:flex-row">
            {/* Coluna da esquerda: Tarefas */}
            <div
                className={`flex h-full max-h-[420px] w-full flex-col gap-4 ${styles.list} pr-2 md:w-[calc(100%-420px)]`}
            >
                {tarefas.length === 0 && (
                    <div className="rounded-md border border-[#D4D4D4] bg-[#FFFFFF] px-4 py-2">
                        <div className="flex w-full cursor-default items-center px-4 py-3">
                            <span className="text-muted-foreground text-sm">
                                Nenhuma tarefa encontrada.
                            </span>
                        </div>
                    </div>
                )}
                {tarefas.map((tarefa, idx) => {
                    return (
                        <CardTarefa
                            key={tarefa.id}
                            tarefa={tarefa}
                            selected={selectedIdx === idx}
                            onClick={() => setSelectedIdx(idx)}
                        />
                    );
                })}
            </div>
            {/* Coluna da direita: Tutorial da Tarefa */}
            <div className="animate-fade-in bg-card sticky top-8 right-0 z-10 hidden h-full w-[400px] max-w-[400px] flex-col gap-6 overflow-hidden rounded-xl border shadow-lg md:flex">
                {tarefas[selectedIdx] && (
                    <DetalheTarefa tarefa={tarefas[selectedIdx]} />
                )}
            </div>
        </div>
    );
}
