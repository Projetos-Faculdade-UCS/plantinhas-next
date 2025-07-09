'use client';
import { realizarTarefa } from '@/shared/api/actions/tarefas';
import { TarefaPlantio } from '@/shared/types/tarefa';
import { Button } from '@/shared/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type RealizarTarefaBtnProps = {
    tarefa: TarefaPlantio;
};
export function RealizarTarefaBtn({ tarefa }: RealizarTarefaBtnProps) {
    const [error, setError] = useState<string | null>(null);
    const dataProximaOcorrencia = new Date(tarefa.dataProximaOcorrencia * 1000);
    const proximaOcorrenciaFormatada = formatDistanceToNow(
        dataProximaOcorrencia,
        {
            addSuffix: true,
            locale: ptBR,
        },
    );
    useEffect(() => {
        setError(null);
    }, [tarefa]);

    return (
        <div className="flex h-fit w-full shrink-0 flex-col gap-0.5 px-4 py-2">
            {error && (
                <span className="text-destructive w-full text-center text-xs">
                    Erro ao concluir a tarefa!
                </span>
            )}
            <Button
                variant="default"
                disabled={!tarefa.podeRealizarTarefa || tarefa.concluido}
                onClick={() => {
                    setError(null);
                    realizarTarefa(tarefa).then((response) => {
                        if (response.data) {
                            toast.success('Tarefa concluída com sucesso!', {
                                description: response.data.mensagem || '',
                            });
                            if (response.data.uppouNivel) {
                                toast.success(
                                    `Parabéns! Você subiu para o nível ${response.data.novoNivel}!`,
                                    {
                                        action: {
                                            label: 'Ver habilidade',
                                            onClick: () => {
                                                redirect('/perfil');
                                            },
                                        },
                                    },
                                );
                            }
                        } else {
                            toast.error('Erro ao concluir a tarefa!', {
                                description: response.error || '',
                            });
                            setError(response.error || 'Erro desconhecido');
                        }
                    });
                }}
                className="bg-primary h-10 w-full text-base"
            >
                {tarefa.concluido
                    ? 'Concluída'
                    : tarefa.podeRealizarTarefa
                      ? 'Concluir'
                      : `Disponível ${proximaOcorrenciaFormatada}`}
            </Button>
        </div>
    );
}
