import { objectToSearchParams } from '@/shared/lib/utils';
import { Client } from '@/shared/types/client';
import {
    ListagemCategorias,
    ListagemPlantas,
    Planta,
} from '@/shared/types/planta';
import { JWTClient } from '../client/jwt-client';

export class PlantaRepository {
    private url: string = process.env.PLANTAS_API_URL || '';
    private client: Client;

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
        return this.client.get<ListagemCategorias>(
            '/gerenciamento/categorias/',
            {
                next: {
                    tags: ['catalogo'],
                    revalidate: 60,
                },
            },
        );
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
    public async getPlantasPorCategoria(idCategoria: number, pagina: number) {
        const params = objectToSearchParams({
            page: pagina,
        });
        return this.client.get<ListagemPlantas>(
            `/gerenciamento/categorias/${idCategoria}/plantas?${params.toString()}`,
            {
                next: {
                    tags: ['categoria', `${params.toString()}`],
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
        return this.client.get<Planta>(`/gerenciamento/plantas/${id}/`, {
            next: {
                tags: ['categoria', `${id}`],
                revalidate: 60,
            },
        });
    }

    /**
     * Busca por todas plantas com base em critérios de pesquisa
     * @param search Termo de pesquisa
     * @param pagina Página atual
     */
    public async searchPlantas(search: string, pagina: number) {
        const params = objectToSearchParams({
            search: search,
            page: pagina,
        });
        return this.client.get<ListagemPlantas>(
            `/gerenciamento/plantas/?${params.toString()}`,
            {
                next: {
                    tags: ['search', `${params.toString()}`],
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

        return this.client.post<Planta>(
            `/gerenciamento/plantas/sugerir`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    }
}
