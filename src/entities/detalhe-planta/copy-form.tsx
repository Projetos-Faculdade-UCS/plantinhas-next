'use client';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useRef, useState } from 'react';

export function CopyForm({
    className = '',
    timeout = 4000,
}: {
    className?: string;
    timeout?: number;
}) {
    const [copied, setCopied] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCopy = async () => {
        if (typeof window !== 'undefined') {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), timeout);
        }
    };

    return (
        <>
            <Input
                ref={inputRef}
                type="text"
                value={
                    typeof window !== 'undefined' ? window.location.href : ''
                }
                readOnly
                className="bg-muted text-muted-foreground flex-1 rounded-md border px-3 py-2 text-sm select-none"
                tabIndex={-1}
                onFocus={(e) => e.target.setSelectionRange(0, 0)}
            />
            <Button
                type="button"
                variant="default"
                className={`h-10 min-h-0 w-10 min-w-0 cursor-pointer rounded-lg p-0 transition-colors duration-200 ${className}`}
                onClick={handleCopy}
                aria-label="Copiar link"
            >
                {copied ? (
                    <i className="ph ph-check text-xl"></i>
                ) : (
                    <i className="ph ph-copy text-xl"></i>
                )}
            </Button>
        </>
    );
}
