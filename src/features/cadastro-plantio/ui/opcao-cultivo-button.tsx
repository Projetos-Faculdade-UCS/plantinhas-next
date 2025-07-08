import Image from 'next/image';
import styles from './fields/styles.module.scss';

type Opcao = {
    foto?: string;
    label: string;
    value: string;
};

type OpcaoCultivoButtonProps = {
    opcao: Opcao;
    value?: string;
    onChange: (value: string | undefined) => void;
    disabled?: boolean;
};

export function OpcaoCultivoButton({
    opcao,
    value,
    onChange,
    disabled,
}: OpcaoCultivoButtonProps) {
    const isSelected = value === opcao.value;

    const handleClick = () => {
        if (isSelected) {
            onChange(undefined);
        } else {
            onChange(opcao.value);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled}
            data-selected={isSelected}
            className={`${styles.selectButton} flex shrink-0 cursor-pointer flex-col items-center justify-between gap-1 rounded-md`}
        >
            <div className="flex h-32 w-32 items-center justify-center">
                {opcao.foto ? (
                    <Image
                        src={opcao.foto}
                        alt={opcao.label}
                        width={200}
                        height={200}
                        className={`h-fit w-full rounded-md object-contain ${styles.imageOpcaoCultivo}`}
                    />
                ) : (
                    <i className="ph-duotone ph-package text-3xl"></i>
                )}
            </div>
            <span className="">{opcao.label}</span>
        </button>
    );
}
