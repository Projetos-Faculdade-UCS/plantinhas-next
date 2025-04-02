import googleImg from '@/public/assets/google.svg';
import { signIn } from '@/shared/lib/auth';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';

export default function SignIn() {
    return (
        <form
            className="w-full"
            action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/feed' });
            }}
        >
            <Button
                className="flex w-full items-center gap-4"
                type="submit"
                size={'lg'}
                variant={'outline'}
            >
                <Image
                    src={googleImg}
                    alt="Google logo"
                    width={25}
                    height={25}
                />
                <span className="text-base font-semibold">
                    Entrar com Google
                </span>
            </Button>
        </form>
    );
}
