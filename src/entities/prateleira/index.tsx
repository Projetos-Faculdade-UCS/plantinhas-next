'use client';
import { useHorizontalScroll } from '@/shared/lib/use-horizontal-scroll';
import { useRef } from 'react';

type PrateleiraPlantasProps = {
    children: React.ReactNode;
    className?: string;
    gap?: string;
    alwaysShowArrows?: boolean;
};

/**
 * @fileoverview Prateleira de itens quaisqueres
 * @description Componente que renderiza uma lista horizontal de plantas.
 */
export function Prateleira({
    children,
    className,
    alwaysShowArrows = false,
    ...props
}: PrateleiraPlantasProps) {
    const scrollDivRef = useRef<HTMLDivElement | null>(null);
    const { canScrollRight, canScrollLeft, scrollRight, scrollLeft } =
        useHorizontalScroll({
            scrollDivRef,
            defaultCanScrollRight: true,
        });
    return (
        <div className={`relative flex items-center ${className}`}>
            {canScrollLeft && (
                <div
                    className="top-0 left-0 z-[2] h-full w-14"
                    style={{
                        position: 'absolute',
                    }}
                >
                    <div
                        data-show-arrows={alwaysShowArrows}
                        className="flex h-full w-full items-center justify-center data-[show-arrows=false]:opacity-0 hover:data-[show-arrows=false]:opacity-100"
                    >
                        <button
                            type="button"
                            className="bg-card cursor-pointer rounded-full border p-1 shadow-sm"
                            onClick={() => {
                                scrollRight();
                            }}
                        >
                            <i className="ph ph-caret-left text-foreground flex text-2xl" />
                        </button>
                    </div>
                </div>
            )}
            <div
                className="flex flex-nowrap overflow-x-scroll p-2"
                ref={scrollDivRef}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                    gap: props.gap || '2rem',
                }}
            >
                {children}
            </div>
            {canScrollRight && (
                <div
                    className="top-0 right-0 z-[2] h-full w-14"
                    style={{
                        position: 'absolute',
                    }}
                >
                    <div
                        data-show-arrows={alwaysShowArrows}
                        className="flex h-full w-full items-center justify-center data-[show-arrows=false]:opacity-0 hover:data-[show-arrows=false]:opacity-100"
                    >
                        <button
                            type="button"
                            className="bg-card cursor-pointer rounded-full border p-1 shadow-sm"
                            onClick={() => {
                                scrollLeft();
                            }}
                        >
                            <i className="ph ph-caret-right text-foreground flex text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
