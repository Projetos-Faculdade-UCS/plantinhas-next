export class PerfilRepository {
    /**
     * Retorna as habilidades existentes do usuário.
     * @returns Uma lista de strings representando as habilidades.
     *
     * TODO: No futuro, buscar de um endpoint de API.
     */
    public async getHabilidadesExistentes(): Promise<string[]> {
        // Dados mockados por enquanto
        return Promise.resolve([
            "Habilidade em jardinagem",
            "Conhecimento sobre plantas aromáticas",
            "Experiência com hortas urbanas"
        ]);
    }
} 