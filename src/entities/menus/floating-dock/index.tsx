'use client';

import { Tab } from '@/entities/menus/types';
import { cn } from '@/shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';


interface Separator {
    type: 'separator';
    title?: string;
    icon?: ReactNode;
    path?: string;
}

export type TabItem = Tab | Separator;

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
        gap: isSelected ? '.5rem' : 0,
        paddingLeft: isSelected ? '1rem' : '.5rem',
        paddingRight: isSelected ? '1rem' : '.5rem',
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: 'auto', opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0, type: 'spring', bounce: 0, duration: 0.4 };

export function FloatingDock({
    tabs,
    className,
    activeColor = 'text-primary',
}: ExpandableTabsProps) {
    const router = useRouter();
    const pathName = usePathname();

    const Separator = () => (
        <div className="bg-border mx-1 h-[24px] w-[1.2px]" aria-hidden="true" />
    );

    return (
        <div className='fixed bottom-10 z-10 flex md:hidden w-full justify-center'>
            <div
                className={cn(
                    'bg-card flex flex-wrap items-center gap-2 rounded-2xl border p-1 shadow-sm',
                    className,
                )}
            >
                {tabs.map((tab, index) => {
                    if (tab.type === 'separator') {
                        return <Separator key={`separator-${index}`} />;
                    }
                    const isActive = pathName === tab.path;

                    return (
                        <motion.button
                            key={tab.title}
                            variants={buttonVariants}
                            initial={false}
                            animate="animate"
                            custom={isActive}
                            onClick={() => {
                                router.push(tab.path!);
                            }}
                            transition={transition}
                            className={cn(
                                'relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300',
                                isActive
                                    ? cn(
                                        'bg-primary-foreground font-semibold',
                                        activeColor,
                                    )
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                        >
                            {tab.icon}
                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <motion.span
                                        variants={spanVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={transition}
                                        className="w-full overflow-hidden text-nowrap"
                                    >
                                        {tab.title}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
