'use client';
import Image from 'next/image';
import { useState } from 'react';

type FallbackImageProps = React.ComponentProps<typeof Image> & {
    fallbackSrc: string;
    fallBackMessage?: string;
};

/**
 * Componente para exibir a imagem de uma planta.
 * Esse componente serve para desacoplar informações de planta em
 * serviços que não dependem do catálogo, como o jardim.
 */
export function FallbackImage({
    alt = 'Imagem padrão de planta',
    src,
    fallbackSrc,
    fallBackMessage,
    onError,
    ...props
}: FallbackImageProps) {
    const [error, setError] = useState(false);

    return (
        <>
            <Image
                src={error ? fallbackSrc : src}
                // placeholder="blur"
                // blurDataURL={fallbackSrc}
                alt={alt}
                onError={(e) => {
                    setError(true);
                    onError?.(e);
                }}
                {...props}
            />
            {error && fallBackMessage && (
                <span className="text-muted-foreground text-xs">
                    {fallBackMessage}
                </span>
            )}
        </>
    );
}
