import { Button } from "@/shared/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Control } from 'react-hook-form';
import { CadastroPlantioFormValues } from '../../schemas/cadastro-plantio.schema';

interface QuantidadeFieldProps {
  control: Control<CadastroPlantioFormValues>;
  disabled: boolean;
}

export function QuantidadeField({ control, disabled }: QuantidadeFieldProps) {
  return (
    <FormField
      control={control}
      name="quantidade"
      render={({ field }) => (
        <FormItem >
          <FormLabel>Quantidade</FormLabel>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="w-8 h-8"
              onClick={() => field.onChange(field.value - 1)}
            >
              <i className="ph ph-minus" />
            </Button>
          <FormControl>
            <Input
              type="number"
              placeholder="Ex: 1"
              {...field}
              className=" w-[10rem] text-center"
              onChange={event => field.onChange(parseInt(event.target.value, 10) || 0)}
              min={1}
              disabled={disabled}
            />
          </FormControl>
          <Button
              variant="outline"
              className="w-8 h-8"
              onClick={() => field.onChange(field.value + 1)}
            >
              <i className="ph ph-plus" />
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
} 