import {
    IAEntradaPlantio,
    IASaidaPlantio,
} from '@/features/cadastro-plantio/lib/ia-api.schema';
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
    public async processarPlantio(dadosPlantio: IAEntradaPlantio) {
        try {
            const response = await this.client.post<IASaidaPlantio>(
                '/',
                dadosPlantio,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response && response.data) {
                return { data: response.data, error: null };
            } else {
                console.error(
                    '[IARepository] Resposta inesperada do HttpClient:',
                    response,
                );
                return {
                    data: null,
                    error: 'Resposta inválida do serviço de IA.',
                };
            }
        } catch (error: unknown) {
            console.error('[IARepository] Erro ao processar plantio:', error);
            let errorMessage = 'Ocorreu um erro ao contatar a API de IA.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return {
                data: null,
                error: errorMessage,
            };
        }
    }
}
