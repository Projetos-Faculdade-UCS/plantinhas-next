import { generatHash } from '@/shared/lib/utils';
import { AISaidaPlantio, IAEntradaPlantio } from '@/shared/types/ai';
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
     * @returns Retorna a resposta da API de IA, conforme AISaidaPlantio.
     */
    public async gerarPlantio(dadosPlantio: IAEntradaPlantio) {
        const hash = generatHash(dadosPlantio);
        const response = await this.client.post<AISaidaPlantio>(
            '/',
            dadosPlantio,
            {
                next: {
                    revalidate: 2000, // 33 minutos e 20 segundos
                    tags: ['gerar-plantio', hash],
                },
            },
        );
        return response;
    }
}
