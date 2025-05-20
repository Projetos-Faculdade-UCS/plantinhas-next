import plantinhas from '@/public/assets/plantinhas.png';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SidebarButton from './SidebarButton';

export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-64 bg-background border-r border-r-[#D4D4D4] overflow-hidden ">
            {/* Sidebar container */}

            <div className="flex items-center gap-2 px-3 py-6">
                {/* Sidebar header */}
                <Image
                    src={plantinhas}
                    alt="Logo Plantinhas"
                    width={50}
                    height={50}
                />
                <span className="text-lg font-bold text-primary">Plantinhas</span>
            </div>

            <div className="flex flex-col gap-2 px-6">
                {/* Sidebar buttons */}
                <SidebarButton
                    icon={<i className="ph ph-house-line text-xl"></i>}
                    title="Página inicial"
                    path="/feed"
                />
                <SidebarButton
                    icon={<i className="ph ph-potted-plant text-xl"></i>}
                    title="Meu Jardim"
                    path="/minhas-plantas"
                />
                <SidebarButton
                    icon={<i className="ph ph-book-bookmark text-xl"></i>}
                    title="Catálogo de plantas"
                    path="/catalogo-plantas"
                />
                <SidebarButton
                    icon={<i className="ph ph-users text-xl"></i>}
                    title="Fórum"
                    path="/forum"
                />

                <Button
                    asChild
                    variant={'default'}
                    className="mt-4 flex w-full items-center justify-center gap-2 text-base bg-primary"
                >   
                    < Link href="/plantar" >
                        <span className="text-base">
                            + Plantar
                        </span>                    
                    </Link>
                </Button>

            </div>
        </div>
    )
}
