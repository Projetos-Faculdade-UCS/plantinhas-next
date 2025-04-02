import { auth, signOut } from '@/shared/lib/auth';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function FeedPage() {
    const session = await auth();

    return (
        <div className="bg-background flex h-full w-full items-center justify-center">
            {session ? (
                <div className="bg-card rounded-md border p-4">
                    <p className="text-center text-2xl">Bom vindo!</p>
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
                    <Button
                        variant={'destructive'}
                        className="mt-4 flex w-full items-center justify-center gap-2 text-base"
                        onClick={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <i className="ph ph-sign-out"></i>
                        Logout
                    </Button>
                </div>
            ) : (
                <Link href="/signin">Entrar</Link>
            )}
            <h1 className="text-white">Feed</h1>
        </div>
    );
}
