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

const sistemasCultivo = [
  { value: 'vaso de flor', label: 'Vaso de Flor' },
  { value: 'canteiro', label: 'Canteiro' },
  { value: 'caixa de cultivo', label: 'Caixa de Cultivo' },
  { value: 'Canteiro elevado', label: 'Canteiro Elevado' },
  { value: 'horta vertical', label: 'Horta Vertical' },
  { value: 'espaldeira', label: 'Espaldeira' },
  { value: 'outros', label: 'Outros' },
];

interface SistemaCultivoFieldProps {
  control: Control<CadastroPlantioFormValues>;
  disabled: boolean;
}

export function SistemaCultivoField({ control, disabled }: SistemaCultivoFieldProps) {
  return (
    <FormField
      control={control}
      name="sistemaCultivo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Como Plantar?</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ''}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sistema de cultivo" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {sistemasCultivo.map((sistema) => (
                <SelectItem key={sistema.value} value={sistema.value}>
                  {sistema.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Qual sistema de cultivo será utilizado?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 