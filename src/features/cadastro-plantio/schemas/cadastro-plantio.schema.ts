import { z } from 'zod';

export const AmbientesSchema = z.object({
  local: z.enum([
    'quintal',
    'sacada',
    'estufa',
    'rua',
    'quarto',
    'sala de estar',
    'banheiro',
    'cobertura',
    'outro',
  ]),
  condicao: z.enum(['externo', 'interno', 'semi-protegido', 'comunitario']),
});

export const SistemaCultivoEnum = z.enum([
  'vaso de flor',
  'canteiro',
  'caixa de cultivo',
  'Canteiro elevado',
  'horta vertical',
  'espaldeira',
  'outros',
]);

export const CadastroPlantioSchema = z.object({
  plantaId: z.string().min(1, 'Selecione uma planta'), // Assumindo que o ID da planta será uma string (ex: vinda da API)
  quantidade: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
  ambiente: AmbientesSchema,
  sistemaCultivo: SistemaCultivoEnum,
  informacoesAdicionais: z.string().optional(),
  // habilidades_existentes será adicionado depois, buscando do perfil-repository
});

export type CadastroPlantioFormValues = z.infer<typeof CadastroPlantioSchema>;

// Removendo PlantioPayloadSchema e PlantioPayload, pois usaremos IAEntradaPlantioSchema diretamente. 