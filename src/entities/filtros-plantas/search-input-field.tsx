import { FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Control } from 'react-hook-form';
import { SearchInput } from './search-input';
import { TFiltrosPlanta } from './types';

export function SearchInputField({
    control,
    onClear,
}: {
    control: Control<TFiltrosPlanta>;
    onClear?: () => void;
}) {
    return (
        <FormField
            control={control}
            name="search"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <SearchInput
                            value={field.value}
                            onChange={(val) => field.onChange(val)}
                            onClear={onClear}
                            placeholder="Buscar planta"
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
