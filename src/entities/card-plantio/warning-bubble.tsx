import styles from './styles.module.scss';

type WarningBubbleProps = {
    situacao: number;
    sede: number;
    saude: number;
};
export function WarningBubble({ situacao, saude }: WarningBubbleProps) {
    const canShowWarning = situacao > 0 && situacao < 1 && saude < 0.1;

    if (canShowWarning) {
        return (
            <div className="absolute top-0 right-0 z-[1] flex">
                <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full shadow ${styles.shaky} ${styles.speechBubble}`}
                >
                    <i
                        className={`ph ph-exclamation-mark text-destructive flex text-2xl`}
                    ></i>
                </div>
            </div>
        );
    }
}
