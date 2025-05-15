import Link from 'next/link';
import React from 'react';

interface SidebarButtonProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  active?: boolean;
}

export default function SidebarButton({ icon, title, path }: SidebarButtonProps) {
  return (
    <Link href={path} passHref legacyBehavior>
      <a className="flex items-center gap-3 py-2 rounded-md w-full text-left transition no-underline hover:bg-gray-100">
        {icon}
        <span className="text-base">{title}</span>
      </a>
    </Link>
  );
}
