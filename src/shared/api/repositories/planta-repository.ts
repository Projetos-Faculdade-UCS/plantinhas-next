import { objectToSearchParams } from '@/shared/lib/utils';
import {
    Categoria,
    ListagemCategorias,
    Planta,
    PlantaPreview,
} from '@/shared/types/planta';
import { PagedResponse } from '@/shared/types/utils';
import { HttpClient } from '../client/http-client';
import { JWTClient } from '../client/jwt-client';

export class PlantaRepository {
    private url: string = process.env.CATALOGO_API_URL || '';
    private client: HttpClient;

    constructor() {
        this.client = new JWTClient(this.url);
    }

    /**
     * Catálogo inicial de plantas separadas por categorias
     * @returns Retorna uma lista de categorias com as principais plantas
     *
     * cache de 1 minuto
     */
    public async getCatalogo() {
        return this.client.get<ListagemCategorias>('/categorias/', {
            next: {
                tags: ['catalogo'],
                revalidate: 60,
            },
        });
    }

    /**
     * Retorna uma categoria específica
     * @param idCategoria ID da categoria
     * @returns Retorna uma categoria específica
     *
     * cache de 1 minuto
     */
    public async getCategoria(idCategoria: number) {
        return this.client.get<Categoria>(`/categorias/${idCategoria}/`, {
            next: {
                tags: ['categoria', `${idCategoria}`],
                revalidate: 60,
            },
        });
    }

    /**
     * Retorna uma lista de plantas filtradas por categoria
     * @param idCategoria ID da categoria
     * @param pagina Página atual
     * @param itensPorPagina Itens por página
     * @returns Retorna uma lista de plantas filtradas por categoria
     *
     * cache de 1 minuto
     */
    public async getPlantasPorCategoria(
        idCategoria: number,
        params: { [key: string]: string | number },
    ) {
        const searchParams = objectToSearchParams({
            ...params,
        });
        return this.client.get<PagedResponse<PlantaPreview>>(
            `/categorias/${idCategoria}/plantas?${searchParams.toString()}`,
            {
                next: {
                    tags: ['plantasPorCategoria', `${searchParams.toString()}`],
                    revalidate: 60,
                },
            },
        );
    }

    /**
     * Retorna uma planta específica
     * @param id ID da planta
     * @returns Retorna uma planta específica
     */
    public async getPlanta(id: number) {
        return this.client.get<Planta>(`/plantas/${id}/`, {
            next: {
                tags: ['planta', `${id}`],
                revalidate: 60, // Cache de 20 segundos para evitar requisições excessivas
            },
        });
    }

    public async getFotoPlanta(fotoUrl: string) {
        const resp = await this.client.getBlob(fotoUrl, {
            next: {
                tags: ['fotoPlanta', `${fotoUrl}`],
                revalidate: 20, // Cache de 20 segundos para evitar requisições excessivas
            },
        });
        return resp;
    }

    /**
     * Busca por todas plantas com base em critérios de pesquisa
     * @param search Termo de pesquisa
     * @param pagina Página atual
     */
    public async searchPlantas(params: { [key: string]: string | number }) {
        const searchParams = objectToSearchParams(params);
        return this.client.get<PagedResponse<PlantaPreview>>(
            `/plantas/?${searchParams.toString()}`,
            {
                next: {
                    tags: ['plantas', `${params.toString()}`],
                    revalidate: 60,
                },
            },
        );
    }

    /**
     *  Sugere uma nova planta para o catálogo
     * @param planta Objeto com os dados da planta
     * @param planta.nome Nome da planta
     * @param planta.foto URL da foto da planta
     * @returns Retorna a planta sugerida
     *
     */
    public async postSugestaoPlanta(
        planta: Pick<Planta, 'nome'> & { foto: File },
    ) {
        const formData = new FormData();
        formData.append('nome', planta.nome);
        formData.append('foto', planta.foto);

        return this.client.post<Planta>(`/plantas/sugerir`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}
