import { CardPlantio } from '@/entities/card-plantio';
import { MyLocationMetrics } from '@/entities/my-location-metrics';
import { Repositories } from '@/shared/api/repositories';
import { PlantioPreview } from '@/shared/types/plantio';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { Suspense, use } from 'react';

export default function JardimPage() {
    const plantios = use(Repositories.plantios.getPlantios());
    return (
        <>
            <MyLocationMetrics />
            <Suspense fallback={<p>Carregando...</p>}>
                <div className="flex items-center gap-2 font-medium">
                    <h3 className="text-lg">Plantas</h3>
                    <span className="text-muted-foreground w-full">
                        ({plantios.data.itens.length})
                    </span>
                    <Button className="w-10 md:w-fit" asChild>
                        <Link href="/jardim/plantio/plantar">
                            <i className="ph ph-plus-circle flex text-lg"></i>
                            <span className="hidden md:flex">Plantar</span>
                        </Link>
                    </Button>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {plantios.data.itens.map((plantio: PlantioPreview) => (
                        <CardPlantio key={plantio.id} plantio={plantio} />
                    ))}

                    {plantios.data.itens.length === 0 ? (
                        <div className="flex flex-col">
                            <Button>
                                <i className="ph ph-plus-circle flex text-lg"></i>
                            </Button>
                            <p className="text-muted-foreground">
                                Você ainda não tem nenhum plantio
                            </p>
                        </div>
                    ) : null}
                </div>
            </Suspense>
        </>
    );
}
