import { CadastroPlantioForm } from '@/features/cadastro-plantio/components/CadastroPlantioForm';
import { Suspense } from 'react';

export default function CriarPlantioPage() {
    return (
        <>
            <h1 className="text-xl font-medium">Plantar</h1>
            <Suspense fallback={<div>Carregando...</div>}>
                <CadastroPlantioForm />
            </Suspense>
        </>
    );
}
