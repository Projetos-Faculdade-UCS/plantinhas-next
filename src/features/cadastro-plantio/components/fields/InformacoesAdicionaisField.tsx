import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import { Control } from 'react-hook-form';
import { CadastroPlantioFormValues } from '../../schemas/cadastro-plantio.schema';

interface InformacoesAdicionaisFieldProps {
  control: Control<CadastroPlantioFormValues>;
  disabled: boolean;
}

export function InformacoesAdicionaisField({ control, disabled }: InformacoesAdicionaisFieldProps) {
  return (
    <FormField
      control={control}
      name="informacoesAdicionais"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Informações Adicionais (Opcional)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Ex: Usar fertilizante orgânico a cada duas semanas."
              className="resize-none"
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            Alguma observação ou detalhe extra sobre o plantio?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 