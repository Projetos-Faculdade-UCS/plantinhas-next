import { clsx, type ClassValue } from 'clsx';
import { Itim } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const itim = Itim({
    subsets: ['latin'],
    weight: '400',
});

export function objectToSearchParams(obj: Record<string, unknown>) {
    const searchParams = new URLSearchParams();

    for (const key in obj) {
        if (obj[key] !== undefined) {
            searchParams.append(key, String(obj[key]));
        }
    }

    return searchParams;
}

/**
 * Aciona o envio do formulário mais próximo do input HTML fornecido.
 * @param element - O elemento HTML de entrada que aciona o envio do formulário.
 * @returns void
 */
export const submitNearForm = (element: HTMLInputElement) => {
    const form = element.closest('form');
    if (form) {
        form.requestSubmit();
    }
};
