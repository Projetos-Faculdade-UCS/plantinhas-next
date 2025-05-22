import type { Tab } from '@/entities/menus/types';
import plantinhas from '@/public/assets/plantinhas.png';
import { auth } from '@/shared/lib/auth';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SidebarButton from './SidebarButton';

interface SidebarProps {
    tabs: Tab[];
}

export default async function Sidebar({ tabs }: SidebarProps) {
    const session = await auth();
    return (
        <div className="bg-background fixed top-0 left-0 hidden h-screen w-64 flex-col justify-between overflow-hidden border-r border-r-[#D4D4D4] md:flex">
            <div>
                <div className="flex items-center gap-2 px-3 py-6">
                    {/* Sidebar header */}
                    <Image
                        src={plantinhas}
                        alt="Logo Plantinhas"
                        width={50}
                        height={50}
                    />
                    <span className="text-primary text-lg font-bold">
                        Plantinhas
                    </span>
                </div>

                <div className="flex flex-col gap-2 px-6">
                    {/* Sidebar buttons */}
                    {tabs.map((tab) => (
                        <SidebarButton
                            key={tab.title}
                            icon={tab.icon}
                            title={tab.title ?? ''}
                            path={tab.path ?? ''}
                        />
                    ))}

                    <Button
                        asChild
                        variant={'default'}
                        className="bg-primary mt-4 flex w-full items-center justify-center gap-2 text-base"
                    >
                        <Link href="/plantar">
                            <span className="text-base">+ Plantar</span>
                        </Link>
                    </Button>
                </div>
            </div>
            {/* Rodapé */}
            {session ? (
                <Link
                    href="/perfil"
                    className="flex w-full items-center gap-3 px-4 py-6 hover:bg-gray-100"
                >
                    <Image
                        src={session.user?.picture || ''}
                        alt="User Image"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-base font-medium">
                        {session.user?.first_name} {session.user?.last_name}
                    </span>
                </Link>
            ) : (
                <Link href="/signin">Entrar</Link>
            )}
        </div>
    );
}
