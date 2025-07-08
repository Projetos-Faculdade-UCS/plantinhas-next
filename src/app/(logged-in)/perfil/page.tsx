import { Repositories } from '@/shared/api/repositories';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/shared/ui/popover';
import { Progress } from '@/shared/ui/progress';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/shared/ui/tooltip';
import Image from 'next/image';

export default async function PerfilPage() {
    const user = await Repositories.profile.getUser();
    const habilidades = await Repositories.habilidades.getHabilidades();

    // Dados fictícios para demonstração dos níveis
    // TODO: Remover quando a API fornecer os detalhes reais
    const habilidadesComNivel = habilidades.data.map((habilidade, index) => ({
        ...habilidade,
        detalhes: {
            xp: "1250",
            nivel: Math.floor(Math.random() * 10) + 1, // Nível entre 1 e 10
            xpParaUpar: 500,
            porcentagem: Math.floor(Math.random() * 100), // Progresso entre 0 e 100%
        }
    }));

    return (
        <div className="flex h-full w-full p-6">
            <div className="flex flex-col w-full">
                <h1 className="text-foreground text-4xl mb-6">Perfil</h1>
                <div className="flex items-center gap-4">
                    <Image
                        src={user.data.profile_picture}
                        alt="Imagem de perfil"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold text-foreground">
                            {`${user.data.user.first_name} ${user.data.user.last_name}`}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {user.data.user.email}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-4">Minhas Habilidades</h3>
                    <div className="space-y-3">
                        {habilidadesComNivel.map((habilidade) => (
                            <div
                                key={habilidade.id}
                                className="flex items-center gap-4 p-4"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                                    {habilidade.id}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-medium text-foreground">
                                                {habilidade.nome}
                                            </h4>
                                            {habilidade.descricao && (
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button className="inline-flex items-center justify-center">
                                                            <i className="ph ph-info text-muted-foreground text-base cursor-pointer hover:text-primary transition-colors"></i>
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-80" align="start">
                                                        <div className="space-y-2">
                                                            <h4 className="font-medium leading-none">{habilidade.nome}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {habilidade.descricao}
                                                            </p>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            )}
                                        </div>
                                        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            Nível {habilidade.detalhes?.nivel || 1}
                                        </span>
                                    </div>
                                    {habilidade.detalhes && (
                                        <div className="space-y-2">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="cursor-help">
                                                        <Progress
                                                            value={habilidade.detalhes.porcentagem}
                                                            className="w-full h-3 bg-primary-foreground border border-border"
                                                        />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="text-center">
                                                        <p className="font-medium">{habilidade.detalhes.xp} XP atual</p>
                                                        <p className="text-xs opacity-90">
                                                            {habilidade.detalhes.xpParaUpar} XP para o próximo nível
                                                        </p>
                                                        <p className="text-xs opacity-90">
                                                            Progresso: {habilidade.detalhes.porcentagem}%
                                                        </p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
