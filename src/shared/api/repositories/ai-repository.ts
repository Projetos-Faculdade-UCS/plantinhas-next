import { IASaidaPlantio } from '@/features/cadastro-plantio/lib/ia-api.schema';
import { IAEntradaPlantio } from '@/shared/types/ai';
import { Client } from '@/shared/types/client';
import { HttpClient } from '../client/http-client';

export class AiRepository {
    private url: string = process.env.AI_API_URL || 'http://localhost:8000'; // Default para localhost:8000
    private client: Client;

    constructor() {
        this.client = new HttpClient(this.url);
    }

    /**
     * Envia os dados do plantio para a API de IA para processamento.
     * @param dadosPlantio Objeto contendo os dados do plantio, conforme IAEntradaPlantioSchema.
     * @returns Retorna a resposta da API de IA, conforme IASaidaPlantioSchema.
     */
    public async gerarPlantio(dadosPlantio: IAEntradaPlantio) {
        const response = await this.client.post<IASaidaPlantio>(
            '/',
            dadosPlantio,
        );
        return response;
    }
}
