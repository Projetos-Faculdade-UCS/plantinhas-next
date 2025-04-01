import { HttpClient } from './http-client';
import { AuthService } from './services/auth-service';
import { ProfileService } from './services/profile-service';

/**
 * Classe que provê acesso centralizado aos serviços externos que a aplicação
 * utiliza.
 * Serviços disponíveis:
 *  - `auth`: Serviço de autenticação
 *  - `profile`: Cliente HTTP para o serviço de perfis
 *
 *  - `main`: Cliente HTTP para o serviço principal
 *  - `aiGen`: Cliente HTTP para o serviço de geração conteúdo com IA
 *  - `openWeather`: Cliente HTTP para o serviço de clima e temperatura
 *  - `openPlants`: Cliente HTTP para o serviço de dados científicos de plantas
 *
 *
 * Exemplo: `Services.auth.googleSignIn(token)`
 */
export class Services {
    private static _auth: AuthService;
    private static _profile: ProfileService;

    // Getter para o cliente de autenticação
    public static get auth(): AuthService {
        if (!this._auth) {
            this._auth = new AuthService();
        }
        return this._auth;
    }

    // Getter para o cliente de perfil
    public static get profile(): ProfileService {
        if (!this._profile) {
            this._profile = new ProfileService();
        }
        return this._profile;
    }

    /**
     * Cria um cliente HTTP para servir como um serviço genérico qualquer
     * @param serviceUrl
     * @returns HttpClient
     * @example
     * const httpClient = Services.createHttpService('https://api.example.com');
     * httpClient.get('/endpoint');
     *
     */
    public static createHttpService(serviceUrl: string): HttpClient {
        return new HttpClient(serviceUrl);
    }
}
