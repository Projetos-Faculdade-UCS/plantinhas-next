import { CardPlantio } from '@/entities/card-plantio';
import { Repositories } from '@/shared/api/repositories';
import { PlantioPreview } from '@/shared/types/plantio';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export async function ListaPlantios() {
    const plantios = await Repositories.plantios.getPlantios();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-medium">
                <h3 className="shrink-0 text-lg">Minhas plantas</h3>
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
            <div className="flex flex-wrap gap-x-4 gap-y-4 sm:gap-x-8">
                {plantios.data.itens.map((plantio: PlantioPreview) => (
                    <CardPlantio key={plantio.id} plantio={plantio} />
                ))}

                {plantios.data.itens.length === 0 ? (
                    <div className="flex h-70 w-full flex-col items-center justify-center gap-2">
                        <i className="ph ph-shovel text-primary text-3xl"></i>
                        <p className="text-muted-foreground">
                            Você não tem nenhum plantio
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
