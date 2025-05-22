import { Repositories } from '@/shared/api/repositories';
import Image from 'next/image';

export default async function PerfilPage() {
    const user = await Repositories.profile.getUser();

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-foreground text-4xl">Perfil</h1>
                <Image
                    src={user.data.profile_picture}
                    alt="Imagem de perfil"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
                {`${user.data.user.first_name} ${user.data.user.last_name}`}
                <br />
            </div>
        </div>
    );
}
