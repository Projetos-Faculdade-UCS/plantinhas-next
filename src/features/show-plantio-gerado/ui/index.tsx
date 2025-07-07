'use client';
import { CardPlantio } from '@/entities/card-plantio';
import { CardTarefa } from '@/entities/card-tarefa';
import { Button } from '@/shared/ui/button';
import { usePlantioAi } from '../lib/context';
import { getPlantioFake, getTarefasFake } from '../lib/utils';
import styles from './style.module.scss';

/**
 * Display a overlay with the generated planting information.
 */
export function ShowPlantioGerado() {
    const { show, plantioGerado, plantaId, onClose } = usePlantioAi();
    if (!show) return null;
    const plantioFake = getPlantioFake(plantaId || 0);
    const tarefasFake = getTarefasFake(plantioGerado?.tarefas || []);
    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
            <div className="flex w-full max-w-2xl flex-col gap-8">
                <div className="bg-card flex flex-col gap-0 rounded-lg px-4 py-2">
                    <h2 className="text-primary text-xl font-bold">
                        Plantio Gerado com sucesso!
                    </h2>
                    <p className="text-muted-foreground">
                        Confira as informações do plantio gerado e confirme para
                        salvar o plantio no seu jardim.
                    </p>
                </div>

                {plantioGerado && plantaId && (
                    <div className="flex h-[320px] items-center justify-between gap-10">
                        <div className="flex flex-col gap-2">
                            <CardPlantio
                                plantio={plantioFake}
                                className="w-full sm:w-full"
                            />
                            <span className="text-muted-foreground bg-card line-clamp-3 rounded-md px-4 py-1">
                                {plantioGerado.informacoes_adicionais}
                            </span>
                        </div>
                        <div
                            className={`flex max-h-full shrink-0 grow flex-col gap-2 px-2 ${styles.list}`}
                        >
                            {tarefasFake.map((tarefa, index) => (
                                <CardTarefa
                                    key={tarefa.nome + index}
                                    tarefa={tarefa}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-4 flex items-center justify-end space-x-2">
                    <Button onClick={onClose} type="button" variant={'outline'}>
                        Cancelar
                    </Button>
                    <Button className="" type="button" onClick={() => {}}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
}
