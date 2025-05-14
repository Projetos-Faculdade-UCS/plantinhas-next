import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function objectToSearchParams(obj: Record<string, unknown>) {
    const searchParams = new URLSearchParams();

    for (const key in obj) {
        if (obj[key] !== undefined) {
            searchParams.append(key, String(obj[key]));
        }
    }

    return searchParams;
}
