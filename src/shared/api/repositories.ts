import { HttpClient } from './client/http-client';
import { AuthRepository } from './repositories/auth-repository';
import { IARepository } from './repositories/ia-repository';
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
    private static _ia: IARepository;

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

    // Getter para o cliente de IA
    public static get ia(): IARepository {
        if (!this._ia) {
            this._ia = new IARepository();
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
