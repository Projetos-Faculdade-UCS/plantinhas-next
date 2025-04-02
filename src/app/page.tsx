import { auth } from '@/shared/lib/auth';
import { permanentRedirect } from 'next/navigation';

export default async function Home() {
    const session = await auth();
    if (!session?.user) {
        permanentRedirect('/signin');
    }

    permanentRedirect('/feed');
}
