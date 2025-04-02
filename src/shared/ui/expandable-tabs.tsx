'use client';

import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface Tab {
    title: string;
    icon: React.ReactNode;
    type?: string;
    path: string;
}

interface Separator {
    type: 'separator';
    title?: string;
    icon?: React.ReactNode;
    path?: string;
}

type TabItem = Tab | Separator;

export interface ExpandableTabsProps {
    tabs: TabItem[];
    className?: string;
    activeColor?: string;
    onChange?: (index: number | null) => void;
}

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: '.5rem',
        paddingRight: '.5rem',
    },
    animate: (isSelected: boolean) => ({
        gap: '.5rem',
        paddingLeft: isSelected ? '1rem' : '.5rem',
        paddingRight: isSelected ? '1rem' : '.5rem',
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: 'auto', opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: 'spring', bounce: 0, duration: 0.6 };

export function ExpandableTabs({
    tabs,
    className,
    activeColor = 'text-primary',
    onChange,
}: ExpandableTabsProps) {
    const router = useRouter();
    const [selected, setSelected] = React.useState<number | null>(null);
    const outsideClickRef = React.useRef<HTMLDivElement>(null);

    useOnClickOutside<HTMLDivElement>(outsideClickRef, () => {
        setSelected(null);
        onChange?.(null);
    });

    const handleSelect = (index: number) => {
        setSelected(index);
        onChange?.(index);
    };

    const Separator = () => (
        <div className="bg-border mx-1 h-[24px] w-[1.2px]" aria-hidden="true" />
    );

    return (
        <div
            ref={outsideClickRef}
            className={cn(
                'bg-card flex flex-wrap items-center gap-2 rounded-2xl border p-1 shadow-sm',
                className,
            )}
        >
            {tabs.map((tab, index) => {
                if (tab.type === 'separator') {
                    return <Separator key={`separator-${index}`} />;
                }

                return (
                    <motion.button
                        key={tab.title}
                        variants={buttonVariants}
                        initial={false}
                        animate="animate"
                        custom={selected === index}
                        onClick={() => {
                            handleSelect(index);
                            router.push(tab.path!);
                        }}
                        transition={transition}
                        className={cn(
                            'relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300',
                            selected === index
                                ? cn(
                                      'bg-primary-foreground font-semibold',
                                      activeColor,
                                  )
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        )}
                    >
                        {tab.icon}
                        <AnimatePresence initial={false}>
                            <motion.span
                                variants={spanVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={transition}
                                className="hidden w-full overflow-hidden text-nowrap sm:block"
                            >
                                {tab.title}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                );
            })}
        </div>
    );
}
