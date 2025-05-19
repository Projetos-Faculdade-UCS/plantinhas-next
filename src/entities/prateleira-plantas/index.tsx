'use client';
import { useHorizontalScroll } from '@/shared/lib/use-horizontal-scroll';
import { useRef } from 'react';

/**
 * @fileoverview Prateleira de Plantas
 * @description Componente que renderiza uma lista horizontal de plantas.
 */
export function PrateleiraPlantas({ children }: { children: React.ReactNode }) {
    const scrollDivRef = useRef<HTMLDivElement | null>(null);
    const { canScrollRight, canScrollLeft, scrollRight, scrollLeft } =
        useHorizontalScroll({
            scrollDivRef,
            defaultCanScrollRight: true,
        });
    return (
        <div className="relative flex w-full items-center">
            {canScrollLeft && (
                <div className="absolute top-0 left-0 z-[2] h-full w-14">
                    <div className="flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                        <button
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
                className="flex w-full flex-nowrap gap-8 overflow-x-scroll p-2"
                ref={scrollDivRef}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    scrollBehavior: 'smooth',
                }}
            >
                {children}
            </div>
            {canScrollRight && (
                <div className="absolute top-0 right-0 z-[2] h-full w-14">
                    <div className="flex h-full w-full items-center justify-center opacity-0 hover:opacity-100">
                        <button
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
