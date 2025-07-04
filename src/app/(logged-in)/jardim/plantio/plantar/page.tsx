import { CadastroPlantioForm } from '@/features/cadastro-plantio/ui/CadastroPlantioForm';
import { Suspense } from 'react';

export default function CriarPlantioPage() {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Plantar</h1>
            <Suspense fallback={<div>Carregando...</div>}>
                <CadastroPlantioForm />
            </Suspense>
        </div>
    );
}
