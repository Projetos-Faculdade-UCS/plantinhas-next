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

const locaisPlantio = [
  { value: 'quintal', label: 'Quintal' },
  { value: 'sacada', label: 'Sacada' },
  { value: 'estufa', label: 'Estufa' },
  { value: 'rua', label: 'Rua' },
  { value: 'quarto', label: 'Quarto' },
  { value: 'sala de estar', label: 'Sala de Estar' },
  { value: 'banheiro', label: 'Banheiro' },
  { value: 'cobertura', label: 'Cobertura' },
  { value: 'outro', label: 'Outro' },
];


interface AmbienteLocalFieldProps {
  control: Control<CadastroPlantioFormValues>;
  disabled: boolean;
}

export function AmbienteLocalField({ control, disabled }: AmbienteLocalFieldProps) {
  return (
    <FormField
      control={control}
      name="ambiente.local"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Onde Plantar?</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ''}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o local do plantio" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {locaisPlantio.map((local) => (
                <SelectItem key={local.value} value={local.value}>
                  {local.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Em qual local o plantio será realizado?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 