import { HttpClient } from './client/http-client';
import { AiRepository } from './repositories/ai-repository';
import { AuthRepository } from './repositories/auth-repository';
import { HabilidadeRepository } from './repositories/habilidade-repository';
import { PlantaRepository } from './repositories/planta-repository';
import { PlantioRepository } from './repositories/plantio-repository';
import { ProfileRepository } from './repositories/profile-repository';

/**
 * Classe que provê acesso centralizado aos repositories que a aplicação
 * utiliza.
 * Repositories disponíveis:
 *  - `auth`: Repository de autenticação
 *  - `profile`: Repository para o serviço de perfis
 *  - `main`: Repository para o serviço principal
 *  - `aiGen`: Repository para o serviço de geração conteúdo com IA
 *  - `openWeather`: Repository para o serviço de clima e temperatura
 *  - `openPlants`: Repository para o serviço de dados científicos de plantas
 *
 *
 * Exemplo: `Services.auth.googleSignIn(token)`
 */
export class Repositories {
    private static _auth: AuthRepository;
    private static _profile: ProfileRepository;
    private static _plantas: PlantaRepository;
    private static _plantios: PlantioRepository;
    private static _ia: AiRepository;
    private static _habilidades: HabilidadeRepository;

    // Getter para o cliente de autenticação
    public static get auth(): AuthRepository {
        if (!this._auth) {
            this._auth = new AuthRepository();
        }
        return this._auth;
    }

    // Getter para o cliente de perfil
    public static get profile(): ProfileRepository {
        if (!this._profile) {
            this._profile = new ProfileRepository();
        }
        return this._profile;
    }

    public static get plantas() {
        if (!this._plantas) {
            this._plantas = new PlantaRepository();
        }
        return this._plantas;
    }

    public static get plantios() {
        if (!this._plantios) {
            this._plantios = new PlantioRepository();
        }
        return this._plantios;
    }

    public static get habilidades() {
        if (!this._habilidades) {
            this._habilidades = new HabilidadeRepository();
        }
        return this._habilidades;
    }

    // Getter para o cliente de IA
    public static get ia(): AiRepository {
        if (!this._ia) {
            this._ia = new AiRepository();
        }
        return this._ia;
    }

    /**
     * Cria um cliente HTTP para servir como um repository genérico qualquer
     * @param serviceUrl
     * @returns HttpClient
     * @example
     * const httpClient = Repositories.createHttpRepository('https://api.example.com');
     * httpClient.get('/endpoint');
     *
     */
    public static createHttpRepository(serviceUrl: string): HttpClient {
        return new HttpClient(serviceUrl);
    }
}
