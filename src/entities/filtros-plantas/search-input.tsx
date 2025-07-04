import { cn } from '@/shared/lib/utils';

type SearchInputProps = Omit<
    React.ComponentProps<'input'>,
    'onChange' | 'onSubmit'
> & {
    onClear?: () => void;
    onChange?: (val: string) => void;
    onSubmit?: () => void;
};

export function SearchInput({
    className,
    onChange,
    onClear,
    onSubmit,
    ...props
}: SearchInputProps) {
    return (
        <div
            className={cn(
                'bg-card border-input flex h-9 w-full items-center overflow-hidden rounded-md border text-base',
                className,
            )}
        >
            <div className="relative flex h-full w-full items-center">
                <input
                    {...props}
                    onChange={(e) => {
                        onChange?.(e.target.value);
                    }}
                    type="text"
                    className="placeholder:text-muted-foreground h-full w-full pr-7 pl-2 outline-none"
                />
                {props.value && (
                    <button
                        type="button"
                        onClick={() => {
                            onClear?.();
                            onChange?.('');
                        }}
                        className="absolute end-0 h-9 cursor-pointer px-2 py-0"
                    >
                        <i className="ph ph-x text-destructive flex text-sm" />
                    </button>
                )}
            </div>

            <button
                type="button"
                onClick={() => onSubmit?.()}
                className="bg-primary text-primary-foreground h-full cursor-pointer px-2"
            >
                <i className="ph ph-magnifying-glass flex" />
            </button>
        </div>
    );
}
