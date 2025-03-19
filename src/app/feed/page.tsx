import { auth, signOut } from '@/shared/lib/auth';
import Link from 'next/link';

export default async function FeedPage() {
    const session = await auth();
    console.log(session);
    return (
        <div className="bg-destructive flex h-full w-full items-center justify-center">
            {session ? (
                <div className="rounded-md bg-white p-4">
                    <p className="text-center">
                        Você já está logado
                        {session.user?.name}
                    </p>
                    <button
                        className="mt-4 block w-full rounded-md bg-green-200 px-4 py-2 text-green-800"
                        onClick={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link href="/signin">Entrar</Link>
            )}
            <h1 className="text-white">Feed</h1>
        </div>
    );
}
