import CardPlanta from '@/entities/card-planta';

export default function CatalogoPlantasPage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="text-2xl">Catálogo de Plantas</p>
            <div>
                <p className="text-lg">
                    Selecione uma planta para ver mais detalhes
                </p>
                <p className="text-md">Explore as opções abaixo:</p>
            </div>

            <div className="flex flex-wrap">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="m-4">
                        <CardPlanta />
                    </div>
                ))}
            </div>
        </div>
    );
}
