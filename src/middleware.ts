import { auth } from '@/shared/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
    const session = await auth();

    if (!session?.accessToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/feed', '/perfil', '/minhas-plantas', '/catalogo-plantas'],
};
