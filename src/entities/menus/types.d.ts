import { ReactNode } from 'react';

interface Tab {
    title: string;
    icon: ReactNode;
    type?: string;
    path: string;
}
