import { z } from 'zod';

// Baseado em docs/tutorial/ai-api.md

export const IAPlantaSchema = z.object({
  nome: z.string(),
  nome_cientifico: z.string(),
  dificuldade: z.object({
    label: z.string(),
    value: z.number(),
  }),
  temperatura_ideal: z.object({
    minima: z.number(),
    maxima: z.number(),
    ideal: z.number(),
  }),
});
export type IAPlanta = z.infer<typeof IAPlantaSchema>;

export const IAAmbienteSchema = z.object({
  local: z.string(),
  condicao: z.enum(['interno', 'externo']),
});
export type IAAmbiente = z.infer<typeof IAAmbienteSchema>;

export const IAEntradaPlantioSchema = z.object({
  data_inicio_plantio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido. Use YYYY-MM-DD."),
  planta: IAPlantaSchema,
  quantidade: z.number().int().min(1),
  ambiente: IAAmbienteSchema,
  sistemaCultivo: z.string(),
  informacoes_adicionais: z.string().optional().default(''),
  habilidades_existentes: z.array(z.string()).optional().default([]),
});
export type IAEntradaPlantio = z.infer<typeof IAEntradaPlantioSchema>;

export const IAHabilidadeSchema = z.object({
    nome: z.string(),
    multiplicador_xp: z.number()
});
export type IAHabilidade = z.infer<typeof IAHabilidadeSchema>;

export const IATarefaSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
    quantidade_total: z.number().int(),
    cron: z.string(),
    habilidade: IAHabilidadeSchema
});
export type IATarefa = z.infer<typeof IATarefaSchema>;

export const IASaidaPlantioSchema = z.object({
  data_fim_plantio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido. Use YYYY-MM-DD."),
  descritivo_como_plantar: z.string(),
  informacoes_adicionais: z.string().optional().nullable(),
  tarefas: z.array(IATarefaSchema),
});
export type IASaidaPlantio = z.infer<typeof IASaidaPlantioSchema>; 