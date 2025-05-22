import { itim } from '@/shared/lib/utils';

export default function PlantioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full w-full flex-col gap-4 px-2 py-2 lg:px-8 lg:py-4">
            <div className="text-primary flex items-center gap-2 px-2">
                <i className="ph ph-shovel flex text-3xl" />
                <p className={`text-2xl font-medium ${itim.className}`}>
                    Meu Jardim
                </p>
            </div>
            {children}
        </div>
    );
}
