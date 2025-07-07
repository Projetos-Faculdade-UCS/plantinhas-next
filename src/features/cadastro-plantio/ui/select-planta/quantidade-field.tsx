import { Button } from '@/shared/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/shared/ui/form';
import { Control } from 'react-hook-form';
import { NewPlantioForm } from '../../lib/cadastro-plantio.schema';
import styles from '../fields/styles.module.scss'; // Importando o CSS específico
interface QuantidadeFieldProps {
    control: Control<NewPlantioForm>;
    disabled: boolean;
}

export function QuantidadeField({ control, disabled }: QuantidadeFieldProps) {
    return (
        <FormField
            control={control}
            name="quantidade"
            render={({ field }) => (
                <FormItem className="w-full">
                    <div className="flex w-full items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={field.value <= 1 || disabled}
                            className="bg-muted h-8 w-8 cursor-pointer disabled:cursor-not-allowed"
                            onClick={() => field.onChange(field.value - 1)}
                        >
                            <i className="ph ph-minus" />
                        </Button>
                        <FormControl>
                            <input
                                type="number"
                                placeholder="Ex: 1"
                                {...field}
                                className={`${styles.numberInput} w-full border-none text-center text-lg font-semibold shadow-none outline-none`}
                                onChange={(event) =>
                                    field.onChange(
                                        parseInt(event.target.value, 10) || 0,
                                    )
                                }
                                onFocus={(event) => {
                                    event.target.select();
                                }}
                                min={1}
                                disabled={disabled}
                            />
                        </FormControl>
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-muted h-8 w-8 cursor-pointer"
                            disabled={disabled}
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
