Perfeito! Vou analisar o branch `develop` do projeto `plantinhas-next` e montar um README.md didático para ajudar novos desenvolvedores a entenderem o propósito do projeto, como rodá-lo, a estrutura de pastas (com FSD), além de listar futuras melhorias como feed, fórum e IA para roteiros de plantio. Já volto com o conteúdo formatado para revisão. 🌱📘

# Plantinhas 🌱 – Jardim Virtual com Rede Social

Bem-vindo ao **Plantinhas**! 😊 Este projeto é como um jardim virtual com elementos de rede social, onde você pode acompanhar o crescimento das suas plantas e também dar uma espiadinha na grama do vizinho. Em outras palavras, é uma aplicação web que combina **cuidados com plantas** e **interação social** – tudo de um jeito divertido e didático.

## 🌱 O que é o projeto?

**Plantinhas** é uma aplicação web que funciona como um **jardim virtual**. Nele, cada usuário pode cultivar plantas digitais, acompanhar o desenvolvimento delas ao longo do tempo e compartilhar essas experiências com outros usuários. Algumas características principais do projeto incluem:

* **Acompanhar o crescimento**: Você “planta” suas espécies favoritas e registra o progresso delas (como se fosse um diário de plantio).
* **Interação social**: Além de cuidar do seu jardim, você pode **ver se a grama do vizinho é mais verde** 😉 – acompanhando jardins de outros usuários, interagindo em posts e futuramente participando de fóruns de discussão sobre plantas.
* **Elementos de jogo e aprendizado**: A ideia é que cuidar de plantas aqui seja divertido e educativo. A aplicação pode fornecer dicas de cuidado, informações sobre cada planta e até missões ou roteiros de cultivo.

Em resumo, o Plantinhas mistura hobby de jardinagem com rede social, criando uma comunidade onde todos podem compartilhar conquistas (por exemplo, “minha rosa floresceu! 🌹”) e aprender juntos sobre jardinagem.

## 🤔 Por que o projeto existe?

O Plantinhas surgiu da vontade de tornar o cuidado com plantas mais engajador e comunitário. Muitas vezes quem ama plantas gostaria de acompanhar as favoritas em um só lugar e comparar experiências com outros jardineiros – sabe aquela curiosidade de ver se **a sua planta está tão bonita quanto a do vizinho**? 😄

Alguns motivos e motivações por trás do projeto:

* **Comunidade de jardinagem**: Criar um espaço onde amantes de plantas possam **compartilhar dicas, sucessos e desafios** ao cuidar de suas plantinhas.
* **Aprendizado colaborativo**: Permitir que iniciantes aprendam com cuidadores mais experientes. Por exemplo, se minha **samambaia** não vai bem, posso ver como outros estão cuidando das deles.
* **Organizar seu hobby**: Ter um diário visual e informativo do crescimento das suas plantas favoritas, tudo em um só lugar, em vez de espalhar fotos e notas em redes sociais genéricas.
* **Curiosidade saudável**: Satisfazer o desejo de **“ver a grama do vizinho”** no bom sentido – acompanhar jardins alheios pode inspirar você a experimentar cultivar novas espécies ou aplicar técnicas diferentes.

Em suma, o Plantinhas existe para unir tecnologia e natureza, motivando pessoas a cuidarem melhor de suas plantas enquanto se divertem e interagem umas com as outras. 🌎💚

## 🔧 Tecnologias Utilizadas

Este projeto é construído com um conjunto de tecnologias modernas para front-end, visando facilidade de desenvolvimento e performance. As principais tecnologias e ferramentas são:

* **React.js** – Biblioteca JavaScript para construir interfaces de usuário de forma declarativa. Toda a interface do Plantinhas é composta de componentes React (com suporte a funcionalidade e estado do React).
* **Next.js** – Framework web full-stack baseado em React. Utilizamos Next.js (versão 15+) para roteamento de páginas, renderização otimizada (incluindo Server Components) e fácil integração com APIs. O projeto está estruturado usando o diretório **`/src/app`** do Next (App Router) para organizar as rotas.
* **Tailwind CSS** – Framework de CSS utilitário para estilização. Em vez de escrever CSS tradicional, usamos classes utilitárias do Tailwind para dar estilo aos componentes de forma rápida e consistente. Toda a identidade visual do app (cores, espaçamentos, etc.) é feita com Tailwind, o que agiliza muito o design de interfaces.
* **TypeScript** – Linguagem que estende JavaScript com tipagem estática. O código do Plantinhas é escrito em TypeScript, o que ajuda a evitar bugs e tornar o desenvolvimento mais claro para iniciantes (você tem auto-complete e dicas de tipos no editor).
* **NextAuth (Autenticação)** – Para a parte de login, usamos a biblioteca NextAuth.js integrada ao Next. Isso nos permite autenticar usuários via OAuth do Google de forma simples. Assim, o usuário pode entrar no Plantinhas usando sua conta Google com um clique.
* **Outras bibliotecas**: Utilizamos algumas libs adicionais para melhorar a UX, como **Framer Motion** (animações), **Lucide Icons** e **Phosphor Icons** (ícones bonitinhos 🖼️), e **React Query** (gerenciamento de estado assíncrono e cache de dados). Essas ferramentas ajudam a deixar o app mais dinâmico e interativo.

*(Obs: Não se preocupe se você não conhece todas essas tecnologias! O importante é que elas facilitam o desenvolvimento e nós explicaremos a estrutura do projeto em seguida. 😉)*

## 🚀 Como rodar o projeto localmente

Você pode rodar o Plantinhas no seu ambiente local para testar e desenvolver. Abaixo estão os passos simples para começar. **Importante**: Este projeto utiliza **Yarn** como gerenciador de pacotes e scripts (preferimos Yarn em vez de NPM por consistência). Não é necessário usar Docker ou containers – basta ter o Node.js instalado na sua máquina.

### **Pré-requisitos:**

* **Node.js** (recomendado versão 18 ou superior) instalado em seu sistema.
* **Yarn** instalado globalmente. Se ainda não tiver o Yarn, instale-o rodando `npm install -g yarn`.

### **Passo a passo para rodar:**

1. **Clone o repositório**: Faça um clone do projeto para a sua máquina:

   ```bash
   git clone https://github.com/Projetos-Faculdade-UCS/plantinhas-next.git
   ```

   Entre na pasta do projeto:

   ```bash
   cd plantinhas-next
   ```

2. **Configure as variáveis de ambiente**: Renomeie o arquivo `env.example` para `.env` na raiz do projeto:

   ```bash
   cp env.example .env
   ```

   Abra o arquivo `.env` e preencha as variáveis necessárias:

   * `AUTH_SECRET`: Uma chave secreta usada pelo NextAuth (você pode gerar uma com o comando sugerido no arquivo).
   * `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`: As credenciais da API do Google OAuth para login (você pode obter criando um OAuth Client ID na Google Cloud).
   * `AUTH_API_URL`: URL do serviço de autenticação da API (por exemplo, o endpoint do backend responsável pela autenticação).
   * *Dica:* Se você não tiver imediatamente essas credenciais, tudo bem. O app ainda vai rodar, mas a funcionalidade de login não irá funcionar sem configurar isso.

3. **Instale as dependências**: Rode o comando de instalação via Yarn na raiz do projeto:

   ```bash
   yarn install
   ```

   Isso vai baixar todas as bibliotecas e pacotes que o projeto utiliza.

4. **Inicie o servidor de desenvolvimento**: Após a instalação, execute:

   ```bash
   yarn dev
   ```

   Você deverá ver no terminal uma mensagem informando que o servidor do Next.js foi iniciado em modo desenvolvimento.

5. **Abra no navegador**: Abra o navegador e acesse **[http://localhost:3000](http://localhost:3000)**. Se tudo correu bem, o aplicativo Plantinhas estará rodando localmente! 🎉

   * Na página inicial você será redirecionado para a tela de login (sign-in). Clique em **“Entrar com Google”** para autenticar. (Lembre-se de que isso só funciona se você configurou as credenciais Google corretamente. Caso contrário, considere desativar temporariamente a verificação de autenticação para testar outras partes do app.)
   * Após login bem-sucedido, você deve ser levado ao **Feed** da aplicação, onde futuramente aparecerão posts e atualizações de outros usuários.

6. **Parando o servidor**: Para encerrar a aplicação, basta voltar ao terminal onde o `yarn dev` está rodando e pressionar `Ctrl + C`.

*Pronto!* Seguindo esses passos você terá o Plantinhas rodando no seu computador. Qualquer dúvida, sinta-se à vontade para perguntar – o projeto é feito pensando em devs iniciantes, então não se intimide! 💜

## 🗂️ Estrutura de pastas (Feature Sliced Design)

A estrutura de código do Plantinhas segue o padrão **Feature-Sliced Design (FSD)**, que nada mais é do que uma maneira organizada de separar as responsabilidades por funcionalidade/camadas. Isso ajuda a manter o projeto escalável e o código mais legível – cada coisa fica em seu lugar. Vamos dar uma olhada simplificada nos principais diretórios dentro de `src/`:

* **`src/app/`** – Contém as páginas e layout da aplicação, seguindo o modelo de rotas do Next.js (App Router). Aqui ficam as definições de rotas como **/signin**, **/feed**, **/jardim**, **/catalogo**, **/perfil**, etc., e também layouts. Por exemplo, temos um layout específico para usuários logados em `src/app/(logged-in)/layout.tsx` que engloba páginas internas com o menu lateral e dock móvel. Cada página é um componente React representando uma tela do app.
* **`src/entities/`** – Módulos **reutilizáveis ligados às entidades do domínio** da aplicação. Pense nas “peças básicas” da interface ou lógica que representam conceitos do negócio. Por exemplo: o componente de login **SignIn** (`src/entities/sign-in.tsx`), os componentes de **Menu lateral (Sidebar)** e **Dock flutuante** usados na navegação, ou ainda cartões de apresentação de dados como o **CardPlantio** (cartão que representa um plantio no jardim do usuário). Esses componentes são usados por páginas ou features e normalmente são bastante focados numa única função/entidade.
* **`src/features/`** – Funcionalidades mais complexas que **combinam múltiplas entidades ou regras de negócio** para formar recursos completos do usuário. Por exemplo, temos a feature de **Lista de Plantas** (`src/features/lista-plantas/`), que monta todo o catálogo de plantas exibindo categorias, resultados de busca, etc. Uma feature pode agrupar componentes, hooks e funções que juntos implementam um caso de uso específico do sistema.
* **`src/shared/`** – Código **compartilhado** e utilitário que pode ser usado em qualquer lugar da aplicação. Aqui entram utilidades genéricas, componentes UI atômicos e configurações. Alguns subdiretórios importantes em `shared`:

  * `shared/ui/` – Componentes de interface **genéricos ou muito reutilizáveis**, independentes da lógica de negócio. Ex: o componente de **Button** customizado (botão estilizado usado em todo lugar), provedores de contexto como o **QueryProvider** (configuração do React Query), etc.
  * `shared/lib/` – Funções utilitárias e bibliotecas internas. Por exemplo, funções auxiliares (utils) e também configuração de **auth** (a integração com o NextAuth e os providers OAuth está aqui em `shared/lib/auth.ts`).
  * `shared/api/` – Módulo de acesso à API/backend. Aqui organizamos as chamadas HTTP para os serviços de backend em **services** e **repositories**. Por exemplo, `Services.auth` lida com autenticação (chamando a API de auth), `Repositories.plantas` lida com obtenção de dados de plantas do serviço principal, e assim por diante. Essa separação permite trocar ou modificar fontes de dados sem impactar o resto do app. Além disso, há definições de tipos TypeScript para as respostas da API em `shared/types/` (por ex., tipos de **Planta**, **Plantio**, **Usuário**, etc).
* **`public/`** – Pasta de arquivos estáticos públicos. Aqui ficam imagens e outros assets. Por exemplo, o logo do projeto **plantinhas.png** e o ícone do Google usados no login (`google.svg`) estão nesse diretório, acessíveis diretamente pelos componentes de interface.

Essa estrutura pode parecer muita coisa à primeira vista, mas na prática deixa o código mais **organizado e fácil de manter**. Por exemplo, se você quer ajustar algo relacionado ao catálogo de plantas, basta procurar em `src/features/lista-plantas`. Se quiser alterar um componente de UI genérico, vai em `src/shared/ui`. E assim por diante. 😃

**Dica:** Para navegar no código, tente entender essa divisão de pastas. Isso vai ajudar bastante! E lembre-se: Feature Sliced Design é só um guia, não uma regra rígida – no futuro, conforme o projeto cresce, podemos adaptar a estrutura conforme necessário.

## ✨ Melhorias Futuras

O Plantinhas já fornece a base para cultivar e acompanhar plantas, mas há muitas funcionalidades legais planejadas para versões futuras do projeto. Algumas das melhorias e novos recursos em nosso radar:

* **Feed de Posts** – Uma espécie de linha do tempo onde usuários poderão postar atualizações sobre suas plantas (fotos do progresso, conquistas, etc.) e ver as atualizações de quem eles seguem. Assim, a comunidade poderá curtir e comentar – transformando o jardim virtual em uma rede social completa.
* **Fórum de Discussão** – Uma seção de fórum para trocas de experiências e dúvidas. Os usuários poderão criar tópicos (por exemplo: “Como cuidar de orquídeas?”) e outros poderão responder, formando uma base de conhecimento comunitária. Isso complementa o feed, focando em discussão mais aprofundada.
* **Geração de Roteiro de Plantio com IA** – Utilizar inteligência artificial para ajudar no planejamento dos cuidados com as plantas. Por exemplo, a IA poderia gerar um **cronograma personalizado de rega, adubação e iluminação** para cada plantinha, baseado nas características da espécie e nos dados fornecidos pelo usuário. Isso ajudaria especialmente iniciantes a saber exatamente como cuidar de cada planta.
* **Integração com Dados de Clima** – Trazer informações climáticas reais (via API de clima) para o app. Assim, o Plantinhas poderia avisar se vai fazer frio ou calor extremo na sua região, ou se vem um período de chuvas – e recomendar ajustes nos cuidados (como regar menos se vai chover, proteger plantas sensíveis do frio, etc.).
* **Enciclopédia de Plantas Ampliada** – Expandir o catálogo com uma base de dados científica/plena de plantas (possivelmente integrando com alguma API pública de plantas). Os usuários teriam acesso a **informações detalhadas** sobre cada espécie: descrição, origem, dificuldade de cultivo, pragas comuns, etc., tudo dentro da plataforma.
* **Outras melhorias gerais** – Interface mobile aprimorada (responsividade 💻📱), notificações para lembrar de cuidar das plantas, personalização do perfil do usuário (foto, bio, lista de plantas favoritas), gamificação (badges para quem cuida bem das plantas), entre outras ideias que podem surgir da comunidade.

Como você pode ver, há um mundo de possibilidades para fazer o Plantinhas florescer 🌻 no futuro! Muitas dessas funcionalidades já estão esboçadas no código ou nos planos (por exemplo, você encontrará referências a serviços de clima e IA no código fonte). **Contribuições são super bem-vindas**, especialmente de desenvolvedores novatos querendo aprender – não tenha medo de sugerir algo ou mesmo tentar implementar uma dessas features. Toda ajuda no jardim é bem-vinda! 🤗

---

Esperamos que este README tenha te deixado animado para explorar e contribuir com o **Plantinhas**. 🌱✨ Sinta-se em casa nesse jardim virtual – a ideia é aprender, se divertir e cultivar (código e plantinhas!) em comunidade. Qualquer dúvida, não hesite em abrir uma *issue* ou conversar com a gente.

**Bons commits e boa jardinagem!** 🚀🌿👩‍💻👨‍💻
