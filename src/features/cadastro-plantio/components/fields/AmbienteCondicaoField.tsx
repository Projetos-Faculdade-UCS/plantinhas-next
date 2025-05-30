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

const condicoesPlantio = [
  { value: 'externo', label: 'Externo' },
  { value: 'interno', label: 'Interno' },
  { value: 'semi-protegido', label: 'Semi-protegido' },
  { value: 'comunitario', label: 'Comunitário' },
];

interface AmbienteCondicaoFieldProps {
  control: Control<CadastroPlantioFormValues>;
  disabled: boolean;
}

export function AmbienteCondicaoField({ control, disabled }: AmbienteCondicaoFieldProps) {
  return (
    <FormField
      control={control}
      name="ambiente.condicao"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Condições do Ambiente</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ''}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione as condições do ambiente" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {condicoesPlantio.map((condicao) => (
                <SelectItem key={condicao.value} value={condicao.value}>
                  {condicao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Quais são as condições predominantes do local?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 