# Documentação Completa do Front-End - Plantinhas

## Tecnologias Utilizadas

O projeto Plantinhas front-end é construído com tecnologias modernas que proporcionam uma experiência robusta e escalável:

### Framework Principal

* **Next.js 15.3.2**: Framework React que permite renderização híbrida (SSR/SSG) e configurações otimizadas para projetos React. Utilizado para roteamento avançado com App Router, middleware de autenticação e otimizações de performance.

* **React 19.0.0**: Biblioteca para construção de interfaces de usuário através de componentes reutilizáveis. A versão mais recente traz melhorias significativas em performance e developer experience.

* **TypeScript 5**: Superset tipado do JavaScript que melhora a segurança e legibilidade do código, fornecendo verificação de tipos em tempo de compilação.

### Bibliotecas Principais

#### Gerenciamento de Estado e Formulários

* **`react-hook-form 7.56.4`**: Gerenciamento eficiente de estado de formulários com validação performática
* **`@tanstack/react-query 5.80.7`**: Gerenciamento de estado de servidor com cache inteligente e sincronização automática
* **`@hookform/resolvers 5.0.1`**: Integração entre react-hook-form e bibliotecas de validação

#### Estilização e UI

* **`tailwindcss 4`**: Framework CSS utility-first para estilização rápida e consistente
* **`@radix-ui/react-*`**: Componentes UI pré-construídos e acessíveis:
  * `@radix-ui/react-accordion 1.2.11`
  * `@radix-ui/react-dialog 1.1.14`
  * `@radix-ui/react-label 2.1.6`
  * `@radix-ui/react-select 2.2.5`
  * `@radix-ui/react-slot 1.2.2`
* **`framer-motion 12.6.3`**: Animações fluidas e transições elegantes
* **`sass 1.88.0`**: Pré-processador CSS para estilos avançados (usado em módulos específicos)

#### Ícones e Assets

* **Phosphor Icons**: Conjunto de ícones leves e personalizáveis (importados via CSS estático)
  * `public/phosphor/duotone/` - Ícones duotone
  * `public/phosphor/regular/` - Ícones regulares

#### Autenticação e Segurança

* **`next-auth 5.0.0-beta.25`**: Autenticação social integrada ao Next.js com suporte a providers OAuth

#### Validação e Utilitários

* **`zod 3.24.4`**: Validação de esquemas TypeScript-first
* **`zod-i18n-map 2.27.0`**: Mensagens de validação internacionalizadas
* **`date-fns 4.1.0`**: Manipulação de datas leve e funcional
* **`clsx 2.1.1`** e **`tailwind-merge 3.0.2`**: Utilitários para manipulação de classes CSS
* **`class-variance-authority 0.7.1`**: Criação de variantes de componentes tipadas

#### Internacionalização e Hooks

* **`i18next 25.2.1`**: Sistema de internacionalização
* **`usehooks-ts 3.1.1`**: Hooks TypeScript úteis para React

### Ferramentas de Desenvolvimento

#### Testing

* **`vitest 2.1.9`**: Framework de testes rápido e moderno
* **`@testing-library/react 16.3.0`**: Utilitários para testes de componentes React
* **`@testing-library/dom 10.4.0`**: Utilitários base para testes DOM
* **`jsdom 26.1.0`**: Implementação DOM para ambiente de testes

#### Linting e Formatação

* **`eslint 9`** com configurações específicas do Next.js
* **`prettier 3.5.3`** com plugin para Tailwind CSS
* **`typescript-eslint 8.26.1`**: Regras ESLint para TypeScript

## Estrutura de Pastas (Feature-Sliced Design)

O projeto segue rigorosamente o padrão **Feature-Sliced Design (FSD)**, uma metodologia que organiza o código por funcionalidades/domínios ao invés de tipos de arquivo. Isso facilita a escalabilidade, modularização e manutenção do código.

### Estrutura Detalhada

```
src/
 app/                          # App Router do Next.js
    layout.tsx               # Layout raiz da aplicação
    page.tsx                 # Página inicial
    globals.css              # Estilos globais
    signin/                  # Rota de autenticação
       page.tsx
    (logged-in)/             # Grupo de rotas protegidas
       layout.tsx           # Layout para usuários autenticados
       catalogo/            # Catálogo de plantas
       jardim/              # Jardim pessoal
       feed/                # Feed social (planejado)
       forum/               # Fórum (planejado)
       perfil/              # Perfil do usuário
    api/                     # API routes (se houver)

 entities/                     # Entidades do domínio
    sign-in.tsx              # Componente de login
    card-planta/             # Cartão de planta
    card-plantio/            # Cartão de plantio
    detalhe-planta/          # Detalhes da planta
    filtros-plantas/         # Filtros do catálogo
    menus/                   # Sistema de navegação
    my-location-metrics/     # Métricas de localização

 features/                     # Funcionalidades complexas
    cadastro-plantio/        # Feature de cadastro de plantio
       lib/                 # Lógica de negócio
       ui/                  # Componentes UI da feature
    lista-plantas/           # Catálogo organizado
    lista-plantios/          # Lista do jardim

 shared/                       # Código compartilhado
     api/                     # Camada de comunicação
        client/              # Clientes HTTP
        repositories/        # Repositórios de dados
        actions/             # Server actions
     lib/                     # Utilitários e configurações
     types/                   # Tipos TypeScript globais
     ui/                      # Componentes UI genéricos
```

### Benefícios do FSD

1. **Baixo acoplamento**: Cada feature é independente e pode ser desenvolvida isoladamente
2. **Alta coesão**: Código relacionado fica agrupado no mesmo local
3. **Escalabilidade**: Fácil adição de novas features sem impactar existentes
4. **Reutilização**: Entities e shared podem ser usados por múltiplas features
5. **Manutenibilidade**: Mudanças ficam localizadas em escopos específicos

## Arquitetura (Camadas)

A arquitetura segue um fluxo bem definido e estratificado do backend até a UI:

### Camada de Comunicação HTTP (`HttpClient`)

```typescript
// src/shared/api/client/http-client.ts
export class HttpClient implements Client {
    private baseUrl: string;
    private headers: HeadersInit;
    
    async get<T>(url: string, init?: CustomFetchProps)
    async post<T>(url: string, body: RequestInit | object, init?: CustomFetchProps)
    async patch<T>(url: string, body: RequestInit | object, init?: CustomFetchProps)
    async delete(url: string, init?: CustomFetchProps)
}
```

**Responsabilidades:**

* Gerencia comunicação HTTP com APIs externas
* Configuração automática de headers (Content-Type, Accept-Language, Authorization)
* Tratamento centralizado de erros HTTP (400, 401, 403, 404, 500)
* Suporte automático a CSRF tokens
* Métodos RESTful padronizados

### Camada de Repositórios (`Repository`)

```typescript
// src/shared/api/repositories.ts
export class Repositories {
    static get auth(): AuthRepository
    static get profile(): ProfileRepository  
    static get plantas(): PlantaRepository
    static get plantios(): PlantioRepository
    static get ia(): AiRepository
}
```

**Responsabilidades:**

* Abstrai o acesso a dados, isolando regras específicas de cada domínio
* Padrão Singleton para garantir instância única
* Encapsula URLs e configurações específicas de cada serviço
* Fornece interface tipada para operações de dados

#### Exemplo de Repository

```typescript
// src/shared/api/repositories/auth-repository.ts
export class AuthRepository {
    public async googleSignIn(googleToken: string): Promise<SessionToken>
    public async refreshToken(refreshToken: string): Promise<SessionToken>
}
```

### Camada de Actions (`Server Actions`)

```typescript
// Exemplo em features/cadastro-plantio/lib/plantio.action.ts
export async function processarPlantioIAAction(entrada: IAEntradaPlantio): Promise<string>
```

**Responsabilidades:**

* Server Actions do Next.js para operações server-side
* Processamento seguro de formulários
* Integração com serviços de IA
* Operações que requerem segurança adicional

### Camada de Hooks (`Custom Hooks`)

**Responsabilidades:**

* Gerenciamento de estado compartilhado
* Lógica de negócio reutilizável
* Integração com React Query para cache inteligente
* Abstrações para operações assíncronas

### Camada de Componentes (`UI Components`)

**Responsabilidades:**

* Elementos visuais reutilizáveis e encapsulados
* Implementação de design system
* Integração com sistema de estado
* Tratamento de eventos de usuário

## Autenticação Social

O sistema implementa autenticação OAuth robusta utilizando NextAuth 5 com arquitetura server-side segura:

### Configuração Principal

```typescript
// src/shared/lib/auth.ts
export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        error: '/signin',
        signIn: '/signin',
    },
    session: {
        maxAge: 1 * 60 * 60, // 1 hora
        strategy: 'jwt',
    },
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) { /* ... */ },
        async session({ session, token }) { /* ... */ }
    }
})
```

### Fluxo de Autenticação

1. **Iniciação**:

   ```tsx
   // src/entities/sign-in.tsx
   <form action={async () => {
       'use server';
       await signIn('google', { redirectTo: '/feed' });
   }}>
   ```

2. **OAuth Google**: Redirecionamento automático para autorização Google

3. **Callback Server-side**:
   * Google retorna `id_token` para a aplicação
   * NextAuth processa o callback automaticamente

4. **Integração com Backend**:

   ```typescript
   // Processo interno do callback JWT
   const { data: { access, refresh, exp } } = 
       await Repositories.auth.googleSignIn(account.id_token);
   
   token.accessToken = access;
   token.refreshToken = refresh;
   token.exp = exp;
   ```

5. **Obtenção de Dados do Usuário**:

   ```typescript
   const userData = await Repositories.profile.static.getUser(access);
   token.user = { ...token.user, ...userData };
   ```

### Middleware de Proteção

```typescript
// src/middleware.ts
export default async function middleware(request: NextRequest) {
    const session = await auth();
    
    if (!session?.accessToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/feed', '/perfil', '/jardim', '/catalogo'],
};
```

### Características de Segurança

* **Tokens JWT**: Sessões baseadas em JWT com expiração automática
* **HTTP-only cookies**: Armazenamento seguro de tokens
* **Renovação automática**: Refresh tokens para renovação transparente
* **Proteção CSRF**: Tokens CSRF automáticos em formulários
* **Validação server-side**: Verificação de sessão no middleware

## Telas da Aplicação

### **Login Social** (`/signin`)

```tsx
// src/app/signin/page.tsx
export default async function SignInPage({ searchParams }) {
    const { error } = await searchParams;
    
    return (
        <div className="bg-background flex h-full w-full items-center justify-center">
            <div className="bg-card flex w-[20rem] flex-col gap-2 rounded-md border px-6 py-4">
                <SignIn />
                {error && <p className="text-destructive">Erro ao fazer login.</p>}
            </div>
        </div>
    );
}
```

**Características:**

* Interface minimalista com logo e botão Google
* Tratamento de erros de autenticação
* Redirecionamento automático para `/feed` após sucesso
* Design responsivo centralizado

### **Catálogo de Plantas** (`/catalogo`)

```tsx
// src/app/(logged-in)/catalogo/page.tsx
export default async function CatalogoPlantasPage({ searchParams }) {
    const { search } = await searchParams;

    return (
        <>
            <FiltrosPlanta />
            {search ? (
                <SearchResults search={search as string} />
            ) : (
                <Suspense fallback={<CatalogoSkeleton />}>
                    <CatalogoPlantas />
                </Suspense>
            )}
        </>
    );
}
```

**Características:**

* Sistema de filtros avançado por categoria e dificuldade
* Busca em tempo real com resultados dinâmicos
* Loading states com skeleton screens
* Navegação para detalhes da planta
* Grid responsivo de cards de plantas

### **Detalhe de Planta** (`/catalogo/planta/[id]`)

**Características:**

* Informações completas da planta (nome, descrição, cuidados)
* Galeria de imagens otimizada
* Indicadores visuais de dificuldade de cultivo
* Botão de ação para iniciar plantio
* Breadcrumb navigation

### **Jardim Pessoal** (`/jardim`)

```tsx
// src/app/(logged-in)/jardim/page.tsx
export default function JardimPage() {
    return (
        <>
            <MyLocationMetrics />
            <Suspense fallback={<ListaPlantiosSkeleton />}>
                <ListaPlantios />
            </Suspense>
        </>
    );
}
```

**Características:**

* Métricas de localização e clima do usuário
* Lista personalizada de plantios ativos
* Cards com status e progresso dos plantios
* Navegação para detalhes específicos do plantio
* Ações rápidas (regar, adubar, etc.)

### **Formulário de Plantio** (`/catalogo/planta/[id]/plantar`)

```tsx
// src/features/cadastro-plantio/ui/CadastroPlantioForm.tsx
export function CadastroPlantioForm() {
    const form = useForm<NewPlantioForm>({
        resolver: zodResolver(CadastroPlantioSchema),
        defaultValues: {
            plantaId: Number(searchParams.get('plantaId')),
            quantidade: 1,
            informacoesAdicionais: '',
            ambiente: { local: undefined, condicao: 'externo' },
            sistemaCultivo: undefined,
        },
    });
    
    async function onSubmit(data: NewPlantioForm) {
        const iaInputPayload = await formatPlantioForm(data);
        const resultIA = await processarPlantioIAAction(iaInputPayload);
        setAiResponse(resultIA);
    }
}
```

**Características:**

* Formulário multi-etapas com validação Zod
* Seleção visual de ambiente (vaso, canteiro, estufa, etc.)
* Configuração de sistema de cultivo
* Campo de informações adicionais personalizadas
* **Integração com IA**: Geração automática de roteiro de cuidados
* Preview do JSON antes do envio
* Estados de loading durante processamento IA

### **Feed Social** (planejado)

* Timeline de posts da comunidade

* Sistema de interações (curtir, comentar)
* Compartilhamento de progresso das plantas
* Seguir outros usuários

### **Fórum** (planejado)

* Discussões organizadas por tópicos e categorias

* Sistema de perguntas e respostas
* Votação em respostas
* Base de conhecimento comunitária

## Disponibilidade e Segurança

### Arquitetura Multi-Backend

O sistema foi projetado para trabalhar com múltiplas fontes de dados de forma resiliente:

```typescript
// src/shared/api/repositories.ts
// Diferentes repositórios para diferentes serviços
- auth: process.env.AUTH_API_URL
- profile: configuração independente  
- plantas: serviço principal
- ia: serviços de IA externos
```

**Benefícios:**

* **Resilência**: App permanece funcional mesmo com falha parcial de serviços
* **Escalabilidade**: Cada serviço pode escalar independentemente
* **Manutenção**: Deploy e manutenção isolados por domínio

### Client-side vs Server-side no Next.js

#### **Renderização Client-side**

```tsx
'use client'; // Directive para componentes client-side

// Características:
- Executa no navegador do usuário
- Ideal para interações dinâmicas e reativas
- Estado compartilhado com React hooks
- Animações e transições fluidas
```

**Casos de uso:**

* Formulários interativos com validação em tempo real
* Componentes com estado complexo (filtros, busca)
* Animações e transições visuais
* Interações imediatas (hover, click, drag)

#### **Renderização Server-side**

```tsx
// Componentes server por padrão no App Router

// Características:
- Executa no servidor Next.js antes da entrega
- Ideal para segurança, SEO e performance inicial
- Acesso direto a cookies, headers e databases
- Geração de HTML estático
```

**Casos de uso:**

* Autenticação e autorização
* Fetch inicial de dados sensíveis
* SEO e meta tags dinâmicas
* Geração de páginas estáticas

### Melhorias de Segurança

#### **Controle de Acesso Server-side**

```typescript
// src/middleware.ts
export default async function middleware(request: NextRequest) {
    const session = await auth();
    
    if (!session?.accessToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
    
    return NextResponse.next();
}
```

#### **Validação de Esquemas**

```typescript
// src/features/cadastro-plantio/lib/cadastro-plantio.schema.ts
export const CadastroPlantioSchema = z.object({
    plantaId: z.number().min(1),
    quantidade: z.number().min(1).max(100),
    ambiente: z.object({
        local: z.enum(['vaso', 'canteiro', 'estufa']),
        condicao: z.enum(['interno', 'externo'])
    }),
    sistemaCultivo: z.string().min(1),
    informacoesAdicionais: z.string().optional(),
});
```

#### **CSRF Protection**

```typescript
// src/shared/api/client/http-client.ts
public async post<T>(url: string, body: RequestInit | object, init?: CustomFetchProps) {
    const csrf = (await cookies()).get('csrftoken')?.value;
    
    const resp = await fetch(`${this.baseUrl}${url}`, {
        method: 'POST',
        headers: await this.getHeaders({
            'X-CSRF-Token': csrf || '',
            ...headers,
        }),
        body: JSON.stringify(body),
    });
}
```

### Resiliência e Performance

#### **Caching Inteligente com React Query**

* Invalidação automática baseada em mutations
* Background refetching para dados sempre atualizados  
* Cache compartilhado entre componentes
* Retry automático em caso de falhas de rede

#### **Server-side Rendering e Otimizações**

```typescript
// Benefícios automáticos do Next.js:
- Geração estática de páginas quando possível
- Lazy loading automático de components
- Code splitting por rota
- Otimização automática de imagens
- Preloading de recursos críticos
```

#### **Loading States e UX**

```tsx
// Skeleton screens para melhor percepção de performance
<Suspense fallback={<CatalogoSkeleton />}>
    <CatalogoPlantas />
</Suspense>

// Estados de loading específicos
const [isLoadingAi, startAiTransition] = useTransition();
```

### Experiência do Usuário

#### **Performance Percebida**

* **Animações suaves**: Framer Motion para transições elegantes
* **Loading states**: Skeletons e spinners contextuais
* **Feedback imediato**: Validação em tempo real nos formulários
* **Navigation predictiva**: Preloading de rotas frequentes

#### **Responsividade e Acessibilidade**

* **Design responsivo**: Layout adaptativo para desktop e mobile

* **Componentes acessíveis**: Radix UI com ARIA completo e navegação por teclado
* **Contraste otimizado**: Cores que atendem WCAG guidelines
* **Focus management**: Navegação lógica entre elementos interativos

#### **Internacionalização**

```typescript
// Preparado para múltiplos idiomas
import { i18next } from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';

// Mensagens de validação localizadas
// Accept-Language header automático nas requisições
```

### Monitoramento e Debugging

#### **Error Handling**

```typescript
// src/shared/api/client/errors.ts
export class BadRequestError extends Error { }
export class UnauthorizedError extends Error { }
export class ForbiddenError extends Error { }
export class NotFoundError extends Error { }
export class ServerError extends Error { }
```

#### **Type Safety**

* **TypeScript strict mode**: Prevenção de erros em tempo de compilação

* **Zod validation**: Validação runtime com inferência de tipos
* **API typing**: Interfaces tipadas para todas as comunicações

#### **Testing Strategy**

```typescript
// Configuração com Vitest e Testing Library
- Testes unitários de componentes
- Testes de integração com mock de APIs
- Testes de acessibilidade automáticos
- Coverage reports detalhados
```

---

## Considerações Finais

Esta documentação reflete exatamente o estado atual do projeto Plantinhas front-end, baseada em análise minuciosa do código-fonte. O sistema demonstra uma arquitetura moderna e bem estruturada, seguindo as melhores práticas de desenvolvimento React/Next.js.

### Pontos Fortes da Implementação

1. **Arquitetura Escalável**: FSD bem implementado facilitando crescimento
2. **Segurança Robusta**: Autenticação server-side e validações múltiplas camadas
3. **Performance Otimizada**: SSR, caching inteligente e loading states
4. **Developer Experience**: TypeScript, tooling moderno e estrutura organizada
5. **User Experience**: Componentes acessíveis, animações e feedback adequado

### Oportunidades de Evolução

* Implementação completa das features planejadas (Feed, Fórum)
* Expansão do sistema de IA para mais funcionalidades
* Maior cobertura de testes automatizados
* Implementação de PWA para uso offline
* Métricas e analytics de uso

O projeto está bem posicionado para crescimento e serve como uma excelente base para um sistema de jardinagem virtual completo e moderno.
