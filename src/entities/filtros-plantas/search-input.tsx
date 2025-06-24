import { cn } from '@/shared/lib/utils';

type SearchInputProps = React.ComponentProps<'input'> & {
    onClear?: () => void;
    onChange?: (val: string) => void;
};

export function SearchInput({
    className,
    onChange,
    onClear,
    ...props
}: SearchInputProps) {
    return (
        <div
            className={cn(
                'bg-card border-input flex h-9 items-center overflow-hidden rounded-md border text-base sm:w-[250px]',
                className,
            )}
        >
            <div className="relative flex h-full w-full items-center">
                <input
                    {...props}
                    onChange={onChange}
                    type="text"
                    className="placeholder:text-muted-foreground h-full w-full pr-7 pl-2 outline-none"
                />
                {props.value && (
                    <button
                        type="button"
                        onClick={() => {
                            onChange?.('');
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
    );
}
