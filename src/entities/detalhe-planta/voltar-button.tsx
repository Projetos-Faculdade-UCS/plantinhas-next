'use client';

import { useRouter } from 'next/navigation';

type VoltarButtonProps = {
    children?: React.ReactNode;
};
export function VoltarButton({ children }: VoltarButtonProps) {
    const router = useRouter();
    return (
        <button
            className="text-muted-foreground flex cursor-pointer items-center gap-2 text-sm"
            onClick={() => router.back()}
        >
            {children || (
                <>
                    <i className="ph ph-arrow-left" />
                    <p className="text-base">Voltar</p>
                </>
            )}
        </button>
    );
}
