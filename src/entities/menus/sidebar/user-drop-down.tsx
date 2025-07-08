import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

type UserDropDownProps = {
    session: Session;
};

export async function UserDropDown({ session }: UserDropDownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="mx-4 my-6 flex cursor-pointer items-center gap-3 rounded-sm px-2 py-2 outline-none">
                <Image
                    src={session.user?.picture || ''}
                    alt="User Image"
                    width={40}
                    height={40}
                    className="rounded-full"
                />

                <span className="text-start text-base font-medium">
                    {session.user?.first_name} {session.user?.last_name}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="">
                <DropdownMenuItem asChild>
                    <Link
                        href="/perfil"
                        className="flex w-full cursor-pointer items-center"
                    >
                        <i className="ph ph-user flex text-lg" />
                        Perfil
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex w-full cursor-pointer items-center">
                    <i className="ph ph-gear flex text-lg" />
                    Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    asChild
                    className="text-destructive flex w-full cursor-pointer items-center"
                >
                    <Link
                        href="/signout"
                        className="flex w-full cursor-pointer items-center"
                    >
                        <i className="ph ph-sign-out flex text-lg" />
                        Sair
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
