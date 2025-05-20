import { FormControl, FormField, FormItem } from '@/shared/ui/form';
import { Control } from 'react-hook-form';
import { TFiltrosPlanta } from './types';

export function SearchInput({
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
                        <div className="bg-card border-input flex h-9 w-full items-center overflow-hidden rounded-md border text-base sm:w-[250px]">
                            <div className="relative flex h-full w-full items-center">
                                <input
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="Buscar planta"
                                    className="placeholder:text-muted-foreground h-full w-full pr-7 pl-2 outline-none"
                                />
                                {field.value && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            field.onChange('');
                                            onClear?.();
                                        }}
                                        className="absolute end-0 h-9 cursor-pointer px-2 py-0"
                                    >
                                        <i className="ph ph-x text-destructive flex text-sm" />
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="bg-primary text-primary-foreground h-full cursor-pointer px-2"
                            >
                                <i className="ph ph-magnifying-glass flex" />
                            </button>
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
