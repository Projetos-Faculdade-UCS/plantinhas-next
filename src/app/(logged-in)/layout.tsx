import { ExpandableTabsProps, FloatingDock } from '@/shared/ui/floating-dock';
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
    const tabs: ExpandableTabsProps['tabs'] = [
        {
            title: 'Início',
            icon: <i className="ph ph-house-line text-xl"></i>,
            path: '/feed',
        },
        {
            title: 'Meu jardim',
            icon: <i className="ph ph-shovel text-xl"></i>,
            path: '/jardim',
        },
        {
            title: 'Catálogo de plantas',
            icon: <i className="ph ph-plant text-xl"></i>,
            path: '/catalogo',
        },
        { type: 'separator' },
        {
            title: 'Fórum',
            icon: <i className="ph ph-users text-xl"></i>,
            path: '/forum',
        },
    ];
    return (
        <main className="bg-background relative h-full w-full">
            <QueryProvider>{children}</QueryProvider>

            <div className="fixed bottom-10 z-10 flex w-full justify-center">
                <FloatingDock
                    tabs={tabs}
                    activeColor="text-primary"
                    className="border-border"
                />
            </div>
        </main>
    );
}
