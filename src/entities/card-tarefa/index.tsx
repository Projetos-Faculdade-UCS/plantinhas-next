import { TarefaPlantioPreview } from '@/shared/types/tarefa';
import Image from 'next/image';

const getTarefaImage = (tipo: TarefaPlantioPreview['tipo']) => {
    return `/assets/thumbnail-tarefas/${tipo}.png`;
};

const getBadgeStatus = (concluido: boolean, podeConcluirTarefa: boolean) => {
    if (concluido) return 'concluido';
    if (podeConcluirTarefa) return 'alerta';
    return null;
};

type CardTarefaProps = {
    tarefa: TarefaPlantioPreview;
    selected?: boolean;
    onClick?: () => void;
};

export function CardTarefa({
    tarefa,
    selected = false,
    onClick,
}: CardTarefaProps) {
    const badgeStatus = getBadgeStatus(
        tarefa.concluido,
        tarefa.podeConcluirTarefa,
    );
    return (
        <div
            key={tarefa.id}
            className={`cursor-pointer rounded-lg border transition-colors ${selected ? 'border-primary bg-primary-foreground' : 'bg-card'} `}
            onClick={onClick}
        >
            <div className="flex w-full flex-row items-center justify-between">
                <div className="flex w-24 items-center justify-center border border-r p-2">
                    <Image
                        src={getTarefaImage(tarefa.tipo)}
                        alt={tarefa.nome}
                        width={45}
                        height={45}
                        className="h-16 w-fit rounded-md object-contain"
                    />
                </div>
                <div className="flex w-full flex-row items-center justify-between px-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-base leading-tight font-medium">
                            {tarefa.nome}
                        </span>
                        <div className="text-muted-foreground flex items-center gap-2">
                            <i className="ph ph-barbell flex text-lg" />
                            <span className="text-base font-medium">
                                {tarefa.quantidadeCompletada}/
                                {tarefa.quantidadeTotal}
                            </span>
                        </div>
                    </div>
                    {/* Badge SERÁ SUBSTITUÍDO */}
                    <div className="flex items-center">
                        {badgeStatus === 'concluido' && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                <i className="ph ph-check-circle text-xl text-green-600" />
                            </div>
                        )}
                        {badgeStatus === 'alerta' && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                                <i className="ph ph-warning-circle text-xl text-yellow-600" />
                            </div>
                        )}
                    </div>
                </div>
                {onClick && (
                    <i className="ph ph-caret-right text-muted-foreground px-4 text-lg" />
                )}
            </div>
        </div>
    );
}
