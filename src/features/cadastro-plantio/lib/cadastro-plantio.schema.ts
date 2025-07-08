import i18next from 'i18next';
import * as z from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/pt/zod.json';
/**
 * definindo a linguagem da engine de validação dos formulários
 * */
i18next.init({
    lng: 'pt',
    resources: {
        pt: { zod: translation },
    },
});
z.setErrorMap(zodI18nMap);

export const AmbienteEnum = z.enum([
    'quintal',
    'sacada',
    'estufa',
    'rua',
    'dentro de casa',
    'quarto',
    'banheiro',
    'outro',
]);

export const SistemaCultivoEnum = z.enum([
    'vaso de flor',
    'canteiro',
    'caixa de cultivo',
    'horta vertical',
    'espaldeira',
    'outros',
]);

export const CadastroPlantioSchema = z.object({
    plantaId: z.number({
        required_error: 'Selecione uma planta para continuar',
    }),
    quantidade: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
    ambiente: AmbienteEnum,
    sistemaCultivo: SistemaCultivoEnum,
    informacoesAdicionais: z.string().optional(),
});

export type NewPlantioForm = z.infer<typeof CadastroPlantioSchema>;
