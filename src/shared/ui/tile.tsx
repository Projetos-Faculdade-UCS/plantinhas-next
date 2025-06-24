import { cn } from '../lib/utils';

type TileProps = {
    className?: string;
    leading?: React.ReactNode;
    trailing?: React.ReactNode;
    value: React.ReactNode;
    title?: React.ReactNode;
};

/**
 * Tile é um componente que exibe informações em um formato de cartão.
 * Ele pode conter ícones ou outros elementos visuais à esquerda e à direita.
 * @param {TileProps} props - As propriedades do componente Tile.
 * @param {React.ReactNode} props.leading - Elemento a ser exibido à esquerda.
 * @param {React.ReactNode} props.trailing - Elemento a ser exibido à direita.
 * @param {React.ReactNode} props.value - Valor a ser exibido no cartão.
 * @param {React.ReactNode} props.title - Título a ser exibido no cartão.
 */
export function Tile({ leading, trailing, value, title, ...props }: TileProps) {
    return (
        <div
            className={cn('flex items-center justify-between', props.className)}
        >
            <div className="flex items-center gap-4">
                {leading}
                <div className="flex flex-col">
                    {title && (
                        <span className="text-muted-foreground text-sm">
                            {title}
                        </span>
                    )}
                    <span className="font-medium">{value}</span>
                </div>
            </div>
            {trailing}
        </div>
    );
}
