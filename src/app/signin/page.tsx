import SignIn from '@/entities/sign-in';
import plantinhas from '@/public/assets/plantinhas.png';
import Image from 'next/image';

export default async function SignInPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;

    return (
        <div className="bg-background flex h-full w-full items-center justify-center">
            <div className="bg-card flex w-[20rem] flex-col gap-2 rounded-md border px-6 py-4">
                <div className="mb-4 flex items-center gap-2">
                    <Image
                        src={plantinhas}
                        alt="Plantinhas"
                        width={70}
                        height={70}
                    />
                    <h1 className="text-primary text-4xl font-bold">
                        Plantinhas
                    </h1>
                </div>
                <SignIn />
                {error ? (
                    <p className="text-destructive mb-4 text-center text-sm">
                        Erro ao fazer login. Tente novamente.
                    </p>
                ) : (
                    <p className="text-muted-foreground mb-4 text-center text-sm">
                        Faça login com sua conta Google
                    </p>
                )}
            </div>
        </div>
    );
}
