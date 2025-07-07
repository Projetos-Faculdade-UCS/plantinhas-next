'use server';

import { AISaidaPlantio } from '@/shared/types/ai';

export async function createPlantio(plantioGerado: AISaidaPlantio) {
    console.log('Criando plantio gerado pela IA:', plantioGerado);
}
