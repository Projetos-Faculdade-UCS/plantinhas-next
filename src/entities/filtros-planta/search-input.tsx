import { Input } from '@/shared/ui/input';
import { InputHTMLAttributes, useDeferredValue, useState } from 'react';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;
/**
 * SearchInput é um componente que renderiza um campo de busca.
 *
 * Os dados são atualizados com um delay para evitar chamadas excessivas à API.
 * O delay é feito usando o hook useDeferredValue.
 */
export function SearchInput(props: SearchInputProps) {
    const [value, setValue] = useState<string>(props.value || '');
    const deferredValue = useDeferredValue(value);

    return (
        <Input
            value={deferredValue}
            onChange={(e) => {
                props.onChange?.(e);
            }}
            type="text"
            placeholder="Buscar planta"
            className="bg-card w-full max-w-[300px]"
        />
    );
}
