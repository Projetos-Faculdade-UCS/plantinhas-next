'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SidebarButtonProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  active?: boolean;
}

export default function SidebarButton({ icon, title, path }: SidebarButtonProps) {
  const currentPath = usePathname();

  const isActive = currentPath === path;
  
  return (
    <Link href={path} passHref className= {cn('flex items-center gap-3 py-2 rounded-md w-full text-left transition no-underline', isActive ? 'text-foreground font-medium' : 'text-muted-foreground')}>
        {icon}
        <span className="text-base">{title}</span>
    </Link>
  );
}
