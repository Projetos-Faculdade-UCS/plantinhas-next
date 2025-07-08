import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';

interface InformacoesAdicionaisFieldProps {
    control: Control<NewPlantioForm>;
    disabled: boolean;
}

export function InformacoesAdicionaisField({
    control,
    disabled,
}: InformacoesAdicionaisFieldProps) {
    return (
        <FormField
            control={control}
            name="informacoesAdicionais"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-base font-semibold">
                        Informações Adicionais
                    </FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Ex: Usar fertilizante orgânico a cada duas semanas."
                            className="bg-card min-h-[74px]"
                            {...field}
                            disabled={disabled}
                        />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
