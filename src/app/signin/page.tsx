import SignIn from '@/entities/sign-in';

export default async function SignInPage() {
    return (
        <div className="bg-destructive flex h-full w-full items-center justify-center">
            <SignIn />
        </div>
    );
}
