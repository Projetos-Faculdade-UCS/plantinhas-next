# Resumo da Implementação: Cadastro de Plantio

Este documento resume as principais etapas e decisões de arquitetura na implementação da funcionalidade de Cadastro de Plantio.

## 1. Stack Tecnológica e Configuração Inicial

*   **Validação de Dados:** Zod (`zod`)
*   **Gerenciamento de Formulário:** React Hook Form (`react-hook-form`)
*   **Componentes de UI:** Shadcn/ui
*   **Variáveis de Ambiente**: `.env.development` e `.env.production` para URLs de API.

**Schemas Zod Iniciais:**
*   `src/features/cadastro-plantio/schemas/cadastro-plantio.schema.ts`:
    *   `CadastroPlantioSchema`: Define a estrutura e validações para os dados do formulário.
*   `src/features/cadastro-plantio/schemas/ia-api.schema.ts`:
    *   `IAPlantaSchema`: Define a estrutura esperada para os dados da planta pela API de IA.
    *   `IAAmbienteSchema`: Define a estrutura para os dados de ambiente da API de IA.
    *   `IAEntradaPlantioSchema`: Define o payload completo a ser enviado para a API de IA para processar o plantio.
        *   `informacoes_adicionais` configurado com `.optional().default('')`.
        *   `habilidades_existentes` configurado com `.optional().default([])`.

**Repositórios Mockados (Fase Inicial):**
*   `src/shared/api/repositories/perfil-repository.ts`: Criado com um método mockado `getHabilidadesExistentes()` para desenvolvimento inicial, antes da implementação real da API.

## 2. Desenvolvimento do Formulário (`CadastroPlantioForm.tsx`)

*   **Abordagem Inicial:** O componente `CadastroPlantioForm.tsx` começou como uma peça monolítica, contendo:
    *   Instanciação direta de repositórios.
    *   `useEffect` para buscar dados iniciais (plantas, habilidades do usuário).
    *   Lógica `onSubmit` para construir o payload JSON e exibi-lo.
    *   Leitura de `plantaId` dos `searchParams` para pré-seleção.
*   **Componentes Shadcn:** Adicionados via CLI (`npx shadcn-vue@latest add select`, `npx shadcn-vue@latest add textarea`).

## 3. Refatoração para Server Actions

*   **Problema:** Erro de build: "You're importing a component that needs 'next/headers'. That only works in a Server Component". Isso ocorreu porque os repositórios (usados por `CadastroPlantioForm`, um Client Component) dependiam de um `http-client.ts` que utilizava APIs exclusivas de Server Components.
*   **Solução:** Criação de Server Actions em `src/features/cadastro-plantio/actions/plantio.actions.ts`:
    *   `getHabilidadesAction()`
    *   `searchPlantasAction(search?, pagina?)`
    *   `getPlantaAction(id)`
    *   `processarPlantioIAAction(payload)`: Para interagir com a API de IA.
*   **Refatoração do Formulário:** `CadastroPlantioForm.tsx` foi modificado para invocar essas Server Actions, utilizando `useTransition` para gerenciar estados de carregamento/pendência e exibir erros.

## 4. Melhorias de Layout

*   O layout de `CadastroPlantioForm.tsx` foi ajustado usando CSS Grid (classes Tailwind CSS) para uma disposição em duas colunas em telas maiores, melhorando a organização visual dos campos.

## 5. Refatoração: Componentização dos Campos do Formulário

*   **Objetivo:** Reduzir o tamanho e complexidade de `CadastroPlantioForm.tsx`.
*   **Implementação:**
    *   Criado o diretório `src/features/cadastro-plantio/components/fields/`.
    *   Cada grupo de campos do formulário foi extraído para seu próprio componente:
        *   `PlantaField.tsx`
        *   `QuantidadeField.tsx`
        *   `AmbienteLocalField.tsx`
        *   `AmbienteCondicaoField.tsx`
        *   `SistemaCultivoField.tsx`
        *   `InformacoesAdicionaisField.tsx`
    *   `CadastroPlantioForm.tsx` foi atualizado para utilizar esses componentes, tornando-o mais enxuto. Constantes de opções para selects foram movidas para seus respectivos componentes de campo.

## 6. Refatoração: Extração de Lógica para Custom Hooks

*   **Objetivo:** Isolar a lógica de busca de dados e manipulação de estado relacionada ao formulário.
*   **Implementação:**
    *   Criado o diretório `src/features/cadastro-plantio/hooks/`.
    *   **`usePlantioInitialData.ts`**:
        *   Responsável por buscar dados iniciais: `habilidadesUsuario` (via `getHabilidadesAction`) e `listaPlantas` (via `searchPlantasAction`).
        *   Gerencia seus próprios estados de carregamento e erro.
    *   **`usePlantaDetalhes.ts`**:
        *   Responsável por buscar os detalhes da planta selecionada (`plantaSelecionadaDetalhes`) sempre que o `watchedPlantaId` (observado do formulário) muda, utilizando `getPlantaAction`.
        *   Gerencia seus próprios estados de carregamento e erro.
    *   **`usePlantioPayload.ts`**:
        *   Responsável por construir o payload (`IAEntradaPlantio`) para a API de IA.
        *   Recebe os valores do formulário, `plantaDetalhes` e `habilidadesUsuario` como props.
        *   Contém a lógica de mapeamento, como `mapCondicaoAmbienteToIA` (de `CondicaoAmbienteFormType` para `CondicaoAmbienteIAType`).
        *   Valida o payload final usando `IAEntradaPlantioSchema.safeParse()`.
        *   **Ponto Importante sobre `planta` no Payload:**
            *   O tipo `Planta` (de `src/shared/types/planta.d.ts`) atualmente **não** fornece os campos `solo_ideal`, `ventilacao`, e `dias_maturidade`.
            *   No `usePlantioPayload.ts`, esses campos foram adicionados ao objeto `planta` do payload IA, mas inicializados com `undefined`. Isso significa que, no JSON final, eles podem ser omitidos ou enviados como `null`, dependendo do tratamento do Zod e da API de IA.
            *   A API de IA, conforme exemplo funcional, espera esses campos.
*   **Impacto em `CadastroPlantioForm.tsx`:** O componente foi significativamente simplificado, delegando a busca e preparação de dados para os hooks. A função `onSubmit` foca em orquestrar a chamada à action `processarPlantioIAAction` com o payload fornecido por `usePlantioPayload`.

## 7. Pontos de Atenção para o Futuro

*   **Dados da Planta Incompletos:** A principal pendência técnica é que os campos `solo_ideal`, `ventilacao` e `dias_maturidade` não são fornecidos pela API que retorna os detalhes da planta (`getPlantaAction` e o tipo `Planta`).
    *   **Recomendação:** Atualizar o backend e o tipo `Planta` para incluir esses dados. Subsequentemente, atualizar `usePlantioPayload.ts` para mapeá-los corretamente a partir de `plantaDetalhes`.
*   **Tratamento de Erros:** Continuar refinando o feedback ao usuário em caso de falhas nas chamadas às actions ou na validação do payload.
*   **Testes:** Implementar testes unitários para os hooks, actions e schemas, e testes de integração para o formulário. 