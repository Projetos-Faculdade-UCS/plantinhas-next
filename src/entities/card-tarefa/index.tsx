import { TarefaPlantioPreview } from '@/shared/types/tarefa';
import Image from 'next/image';
import { getBadgeStatus, getBgColor, getTarefaImage } from './lib/utils';

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
        tarefa.podeRealizarTarefa,
    );
    return (
        <div
            key={tarefa.id}
            className={`h-fit cursor-pointer rounded-lg border transition-colors ${selected ? 'border-primary bg-primary-foreground' : 'bg-card'} `}
            onClick={onClick}
        >
            <div className="flex w-full flex-row items-center justify-between">
                <div
                    className="rounded-l-lg border-r p-2"
                    style={{
                        backgroundColor: getBgColor(tarefa.tipo),
                    }}
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
                </div>
                <div className="flex w-full flex-row items-center justify-between px-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-base leading-tight font-medium">
                            {tarefa.nome}
                        </span>
                        <div className="text-muted-foreground flex items-center gap-2">
                            <i className="ph ph-calendar-dots flex text-lg" />
                            <span className="mr-4 text-sm">
                                {tarefa.frequencia || 'Às vezes'}
                            </span>
                            <i className="ph ph-calendar-check flex text-lg" />
                            <span className="text-sm">
                                {tarefa.quantidadeCompletada} /{' '}
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
