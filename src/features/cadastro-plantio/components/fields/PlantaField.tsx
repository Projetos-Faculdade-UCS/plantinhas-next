import { Planta } from '@/shared/types/planta';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/shared/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import { Control } from 'react-hook-form';
import { CadastroPlantioFormValues } from '../../schemas/cadastro-plantio.schema';

interface PlantaFieldProps {
  control: Control<CadastroPlantioFormValues>;
  disabled: boolean;
  listaPlantas: Planta[];
  errorState: string | null;
}

export function PlantaField({ control, disabled, listaPlantas, errorState }: PlantaFieldProps) {
  return (
    <FormField
      control={control}
      name="plantaId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Planta</FormLabel>
          <Select
            onValueChange={(value: string) => {
              field.onChange(value);
            }}
            value={field.value || ''}
            disabled={disabled && listaPlantas.length === 0}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma planta" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {(disabled && listaPlantas.length === 0) && <SelectItem value="loading" disabled>Carregando plantas...</SelectItem>}
              {!disabled && listaPlantas.length === 0 && !errorState && <SelectItem value="no-plants" disabled>Nenhuma planta encontrada.</SelectItem>}
              {/* Se houver errorState e nenhuma planta, poderia exibir uma mensagem de erro aqui também */}
              {listaPlantas.map((planta) => (
                <SelectItem key={planta.id} value={String(planta.id)}>
                  {planta.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Selecione a planta que você deseja registrar.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 