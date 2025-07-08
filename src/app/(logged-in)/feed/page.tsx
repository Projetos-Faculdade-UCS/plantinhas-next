import { auth } from '@/shared/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function FeedPage() {
    const session = await auth();

    return (
        <div className="flex h-full w-full items-center justify-center">
            {session ? (
                <div className="bg-card rounded-md border p-4">
                    <p className="text-center text-2xl">Bem vindo!</p>
                    <Image
                        src={session.user?.picture || ''}
                        alt="User Image"
                        width={100}
                        height={100}
                        className="mx-auto mb-4 rounded-full"
                    />
                    <p className="text-primary text-lg">
                        {session.user?.first_name} {session.user?.last_name}☝️
                    </p>
                </div>
            ) : (
                <Link href="/signin">Entrar</Link>
            )}
        </div>
    );
}
