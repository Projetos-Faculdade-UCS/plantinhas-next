import { CardPlantio } from '@/entities/card-plantio';
import { itim } from '@/shared/lib/utils';
import { PlantioPreview } from '@/shared/types/plantio';

export default function JardimPage() {
    return (
        <div className="flex h-full w-full flex-col gap-4 px-2 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between gap-2 pr-8">
                <div className="text-primary flex items-center gap-2 px-2">
                    <i className="ph ph-shovel text-3xl" />
                    <p className={`text-2xl font-medium ${itim.className}`}>
                        Meu Jardim
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
                <CardPlantio plantio={{} as PlantioPreview} />
            </div>
        </div>
    );
}
