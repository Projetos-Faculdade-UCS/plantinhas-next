import {
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/shared/ui/dropdown-menu';
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type UserDropDownProps = {
    session: Session;
};

export async function UserDropDown({ session }: UserDropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image
                    src={session.user?.picture || ''}
                    alt="User Image"
                    width={40}
                    height={40}
                    className="rounded-full"
                />

                <span className="text-base font-medium">
                    {session.user?.first_name} {session.user?.last_name}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link
                        href="/perfil"
                        className="flex w-full items-center gap-3 px-4 py-6 hover:bg-gray-100"
                    >
                        Perfil
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
