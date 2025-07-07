import { FormCadastroPlantio } from '@/features/cadastro-plantio/ui/form-cadastro-plantio';
import { ShowPlantioGerado } from '@/features/show-plantio-gerado/ui';
import { PlantioAiProvider } from '@/features/show-plantio-gerado/ui/provider';
import { Suspense } from 'react';

export default function CriarPlantioPage() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Plantar</h1>
            <Suspense fallback={<div>Carregando...</div>}>
                <PlantioAiProvider>
                    <FormCadastroPlantio />
                    <ShowPlantioGerado />
                </PlantioAiProvider>
            </Suspense>
        </div>
    );
}
