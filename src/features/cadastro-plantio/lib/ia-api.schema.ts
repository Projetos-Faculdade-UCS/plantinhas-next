import { z } from 'zod';

/* Esquemas de SAÍDA */

export const IAHabilidadeSchema = z.object({
    nome: z.string(),
    multiplicador_xp: z.number(),
});
export type IAHabilidade = z.infer<typeof IAHabilidadeSchema>;

export const IATutorialSchema = z.object({
    materiais: z.array(
        z.object({
            nome: z.string(),
            quantidade: z.string(),
        }),
    ),
    etapas: z.array(
        z.object({
            descricao: z.string(),
            ordem: z.number().int(),
        }),
    ),
});

export const IATarefaSchema = z.object({
    nome: z.string(),
    tipo: z.string(),
    quantidade_total: z.number().int(),
    cron: z.string(),
    habilidade: IAHabilidadeSchema,
    tutorial: IATutorialSchema,
});
export type IATarefa = z.infer<typeof IATarefaSchema>;

export const IASaidaPlantioSchema = z.object({
    data_fim_plantio: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            'Formato de data inválido. Use YYYY-MM-DD.',
        ),
    informacoes_adicionais: z.string().optional().nullable(),
    tarefas: z.array(IATarefaSchema),
});
export type IASaidaPlantio = z.infer<typeof IASaidaPlantioSchema>;
