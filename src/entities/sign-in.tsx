import { signIn } from '@/auth';
import googleImg from '@/public/assets/google.svg';
import Image from 'next/image';

export default function SignIn() {
    return (
        <form
            action={async () => {
                'use server';
                await signIn('google');
            }}
        >
            <button
                className="flex items-center gap-2 rounded-md bg-green-200 px-4 py-2 text-green-800"
                type="submit"
            >
                <Image
                    src={googleImg}
                    alt="Google logo"
                    width={20}
                    height={20}
                />
                <span>Entrar com Google</span>
            </button>
        </form>
    );
}
