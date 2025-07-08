'use client';
import { checkTarefasPendentes } from '@/shared/api/actions/tarefas';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

type WarningBubbleProps = {
    plantioId: number;
};

export function WarningBubble({ plantioId }: WarningBubbleProps) {
    const [canShowWarning, setCanShowWarning] = useState(false);

    useEffect(() => {
        checkTarefasPendentes(plantioId).then((response) => {
            setCanShowWarning(response);
        });
    }, [plantioId]);

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
