import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

/**
 * Gera um hash simples baseado nos dados para identificar unicamente a requisição.
 * Este hash pode ser usado para cache ou identificação de requisições.
 * @param dados Objeto contendo dados de algo
 * @returns Retorna uma string representando o hash dos dados.
 */
export const generatHash = (dados: object): string => {
    const dataString = JSON.stringify(dados);
    let hash = 0;
    for (let i = 0; i < dataString.length; i++) {
        const char = dataString.charCodeAt(i);
        hash = (hash << 5) - hash + char; // hash * 31 + char
        hash |= 0; // Convert to 32-bit integer
    }
    return hash.toString();
};

export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getTimeAgo(dateString: string | undefined): string {
    if (!dateString) return 'Nunca';
    return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ptBR,
    });
}
