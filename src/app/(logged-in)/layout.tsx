import { FloatingDock } from '@/entities/menus/floating-dock';
import Sidebar from '@/entities/menus/sidebar';
import { Tab } from '@/entities/menus/types';
import { QueryProvider } from '@/shared/ui/query-provider';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Plantinhas',
    description: 'A plantinha que cuida de você',
};

export default function LoggedInLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tabs: Tab[] = [
        {
            title: 'Início',
            icon: <i className="ph ph-house-line text-xl"></i>,
            path: '/feed',
        },
        {
            title: 'Minhas plantas',
            icon: <i className="ph ph-potted-plant text-xl"></i>,
            path: '/minhas-plantas',
        },
        {
            title: 'Catálogo de plantas',
            icon: <i className="ph ph-book-bookmark text-xl"></i>,
            path: '/catalogo',
        },
        {
            title: 'Fórum',
            icon: <i className="ph ph-users text-xl"></i>,
            path: '/forum',
        },
    ];
    return (
        <main className="bg-background relative h-full w-full">
            <Sidebar tabs={tabs} />

            <div className="md:ml-64">
                <QueryProvider>{children}</QueryProvider>
            </div>

            <FloatingDock
                tabs={tabs}
                activeColor="text-primary"
                className="border-border"
            />
        </main>
    );
}
