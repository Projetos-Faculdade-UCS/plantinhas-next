'use client';
import { deletePlantio } from '@/shared/api/actions/plantios';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/shared/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { redirect } from 'next/navigation';

export function DeletarPlantio({ plantioId }: { plantioId: number }) {
    const onDelete = async () => {
        try {
            deletePlantio(plantioId).then((response) => {
                if (response?.status === 204) {
                    redirect('/jardim');
                }
            });
        } catch {
            // Handle error
        }
    };
    return (
        <Dialog>
            <DialogTrigger className="bg-destructive-foreground hover:bg-destructive hover:text-destructive-foreground text-destructive flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5">
                <i className="ph ph-trash flex text-base" />
                <span className="text-sm">Deletar</span>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Deletar Plantio</DialogTitle>
                <DialogDescription>
                    Tem certeza que deseja deletar o plantio? Essa ação não pode
                    ser desfeita.
                </DialogDescription>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogTrigger>
                    <Button variant="destructive" onClick={onDelete}>
                        Deletar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
