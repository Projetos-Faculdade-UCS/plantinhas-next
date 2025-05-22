import { itim } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export default function CatalogoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full w-full flex-col gap-4 py-2 pl-2 lg:py-4 lg:pl-8">
            <div className="flex items-center justify-between gap-2 pr-8">
                <div className="text-primary flex items-center gap-2 px-2">
                    <i className="ph ph-plant flex text-3xl" />
                    <p className={`text-2xl font-medium ${itim.className}`}>
                        Catálogo de Plantas
                    </p>
                </div>
                <Button
                    variant="default"
                    className="hidden lg:flex"
                    title="Sugerir Planta"
                >
                    <i className="ph ph-plus-circle flex text-lg"></i>
                    Sugerir
                </Button>
            </div>
            {children}
        </div>
    );
}
