import { submitNearForm } from '@/shared/lib/utils';
import { FormControl, FormField, FormItem } from '@/shared/ui/form';
import { useRef } from 'react';
import { Control } from 'react-hook-form';
import { SearchInput } from './search-input';
import { TFiltrosPlanta } from './types';

export function SearchInputField({
    control,
    onClear,
    onChange,
}: {
    control: Control<TFiltrosPlanta>;
    onClear?: () => void;
    onChange?: (value: string) => void;
}) {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <FormField
            control={control}
            name="search"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <SearchInput
                            ref={ref}
                            value={field.value}
                            onSubmit={() => submitNearForm(ref.current!)}
                            onChange={(val) => {
                                field.onChange(val);
                                onChange?.(val);
                            }}
                            onClear={onClear}
                            placeholder="Buscar planta"
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
