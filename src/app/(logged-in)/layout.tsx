import Sidebar from '@/entities/sidebar';
import { ExpandableTabsProps, FloatingDock } from '@/shared/ui/floating-dock';
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
            title: 'Minhas plantas',
            icon: <i className="ph ph-potted-plant text-xl"></i>,
            path: '/minhas-plantas',
        },
        {
            title: 'Catálogo de plantas',
            icon: <i className="ph ph-book-bookmark text-xl"></i>,
            path: '/catalogo-plantas',
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
            
            <Sidebar />

            <main className='ml-64'>{children}</main>

            <div className="absolute bottom-10 z-10 flex w-full justify-center">
                <FloatingDock
                    tabs={tabs}
                    activeColor="text-primary"
                    className="border-border"
                />
            </div>
        </main>
    );
}
