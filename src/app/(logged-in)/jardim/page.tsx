import { CardPlantio } from '@/entities/card-plantio';
import { Repositories } from '@/shared/api/repositories';
import { PlantioPreview } from '@/shared/types/plantio';
import { Button } from '@/shared/ui/button';
import { Suspense, use } from 'react';

export default function JardimPage() {
    const plantios = use(Repositories.plantios.getPlantios());
    return (
        <>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
                <Suspense fallback={<p>Carregando...</p>}>
                    {plantios.data.itens.map((plantio: PlantioPreview) => (
                        <CardPlantio key={plantio.id} plantio={plantio} />
                    ))}
                    {plantios.data.itens.length === 0 && (
                        <div className="flex flex-col">
                            <Button>
                                <i className="ph ph-plus-circle flex text-lg"></i>
                            </Button>
                            <p className="text-muted-foreground">
                                Você ainda não tem nenhum plantio
                            </p>
                        </div>
                    )}
                </Suspense>
            </div>
        </>
    );
}
