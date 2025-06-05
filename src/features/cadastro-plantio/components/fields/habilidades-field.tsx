import { useQuery } from '@tanstack/react-query';
import { getHabilidadesAction } from '../../actions/plantio.actions';

export function HabilidadesField() {
    const {
        data: habilidades = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['habilidades'],
        queryFn: async () => {
            const response = await getHabilidadesAction();
            if (response.error) {
                throw new Error(response.error);
            }
            return response.data || [];
        },
        refetchOnWindowFocus: false,
    });
    return (
        <>
            {isLoading && (
                <p className="text-muted-foreground text-sm">
                    Carregando habilidades...
                </p>
            )}
            {!isLoading && habilidades.length > 0 && (
                <ul className="list-inside list-disc space-y-1 text-sm">
                    {habilidades.map((habilidade) => (
                        <li key={habilidade}>{habilidade}</li>
                    ))}
                </ul>
            )}
            {!isLoading && habilidades.length === 0 && !isError && (
                <p className="text-muted-foreground text-sm">
                    Nenhuma habilidade encontrada.
                </p>
            )}
            {isError && !isLoading && (
                <p className="text-destructive text-sm">
                    Erro ao carregar habilidades: {error.message}
                </p>
            )}
        </>
    );
}
