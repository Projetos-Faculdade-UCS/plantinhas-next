'use client';
import Image from 'next/image';
import { useState } from 'react';

type FallbackImageProps = Omit<React.ComponentProps<typeof Image>, 'src'> & {
    fallbackMessage?: string;
    src?: string;
};

/**
 * Componente para exibir a imagem de uma planta.
 * Esse componente serve para desacoplar informações de planta em
 * serviços que não dependem do catálogo, como o jardim.
 */
export function FallbackImage({
    alt = 'Imagem padrão de planta',
    src,
    fallbackMessage,
    onError,
    ...props
}: FallbackImageProps) {
    const [error, setError] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <Image
                placeholder="blur"
                blurDataURL={'/assets/loading.png'}
                src={!src || error ? '/assets/erro-planta.png' : src}
                alt={alt}
                onError={(e) => {
                    setError(true);
                    onError?.(e);
                }}
                {...props}
            />
            {error && fallbackMessage && (
                <span className="text-muted-foreground text-xs">
                    {fallbackMessage}
                </span>
            )}
        </div>
    );
}
