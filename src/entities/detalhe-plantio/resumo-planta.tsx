import { Repositories } from '@/shared/api/repositories';
import Link from 'next/link';
import { use } from 'react';

export function ResumoPlanta({ plantaId }: { plantaId: number }) {
    try {
        const { data: planta } = use(Repositories.plantas.getPlanta(plantaId));
        return (
            <>
                <h1 className="text-2xl font-bold">{planta.nome}</h1>
                <div className="text-muted-foreground flex items-center gap-2">
                    <span className="italic">Cientificus</span>
                    <Link href={`/catalogo/planta/${planta.id}`} className="">
                        <i className="ph ph-arrow-square-out flex" />
                    </Link>
                </div>
            </>
        );
    } catch {
        return (
            <div>
                <h1 className="text-2xl font-bold">Erro ao Carregar planta</h1>
            </div>
        );
    }
}
