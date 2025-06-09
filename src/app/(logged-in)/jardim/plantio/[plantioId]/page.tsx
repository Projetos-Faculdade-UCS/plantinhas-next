import { HeaderIndicadores } from '@/entities/detalhe-plantio/header-indicadores';
import { Repositories } from '@/shared/api/repositories';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export default function PlantioPage({
    params,
}: {
    params: Promise<{ plantioId: string }>;
}) {
    const plantioId = Number(use(params).plantioId);
    const { data: plantio } = use(Repositories.plantios.getPlantio(plantioId));
    const tarefas = use(Repositories.plantios.getTarefasPlantio(plantioId));

    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex gap-12">
                <Image
                    src={plantio.planta.foto || '/assets/plantas/girassol.png'}
                    alt={plantio.planta.nome}
                    width={1000}
                    height={1000}
                    className={`h-[240px] w-fit object-contain`}
                />
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <Link
                            href={`/jardim/`}
                            className="text-muted-foreground flex items-center gap-2 text-sm"
                        >
                            <i className="ph ph-arrow-left flex" />
                            <p className="text-base">Voltar</p>
                        </Link>
                        <h1 className="text-2xl font-bold">
                            {plantio.planta.nome}
                        </h1>
                        <div className="text-muted-foreground flex items-center gap-2">
                            <span className="italic">Cientificus</span>
                            <Link
                                href={`/catalogo/planta/${plantio.planta.id}`}
                                className=""
                            >
                                <i className="ph ph-arrow-square-out flex" />
                            </Link>
                        </div>
                    </div>
                    <HeaderIndicadores
                        situacao={plantio.situacao}
                        saude={plantio.saude}
                        sede={plantio.sede}
                    />
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Tarefas</h2>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Coluna da esquerda: Tarefas */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        <Accordion type="single" collapsible className="flex flex-col gap-4">
                            {tarefas.length === 0 && (
                                <AccordionItem value="empty" className="rounded-md bg-[#FFFFFF] border border-[#D4D4D4] px-4 py-2">
                                    <AccordionTrigger asChild>
                                        <div className="w-full cursor-default flex items-center px-4 py-3">
                                            <span className="text-muted-foreground text-sm">Nenhuma tarefa encontrada.</span>
                                        </div>
                                    </AccordionTrigger>
                                </AccordionItem>
                            )}
                            {tarefas.map((tarefa) => (
                                <AccordionItem
                                    key={tarefa.id}
                                    value={`tarefa-${tarefa.id}`}
                                    className="rounded-lg bg-[#FFFFFF] border border-[#D4D4D4] px-4 py-2"
                                >
                                    <AccordionTrigger asChild className='hover:no-underline gap-1'>
                                        <div className="w-full cursor-pointer flex flex-col py-3">
                                            <span className="font-medium text-base leading-tight">{tarefa.descricao}</span>
                                            <span className="text-xs text-muted-foreground leading-none">{tarefa.status}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-row justify-between items-center gap-8 py-2 w-full">
                                            <div className="flex flex-col flex-1 items-start">
                                                <span className="text-xs text-muted-foreground">Frequência</span>
                                                <span className="text-base font-medium">{tarefa.frequencia}</span>
                                            </div>
                                            <div className="flex flex-col flex-1 items-center">
                                                <span className="text-xs text-muted-foreground">Progresso</span>
                                                <span className="text-base font-medium">{tarefa.quantidadeCompletada} de {tarefa.quantidadeTotal}</span>
                                            </div>
                                            <div className="flex flex-col flex-1 items-end">
                                                <span className="text-xs text-muted-foreground">Última alteração</span>
                                                <span className="text-base font-medium">{tarefa.ultimaAlteracao}</span>
                                            </div>
                                        </div>
                                        <Button
                                            asChild
                                            variant={'default'}
                                            size={'sm'}
                                            className="flex items-center justify-center text-base bg-primary mt-4"
                                        >
                                            <span className="text-base">Concluir</span>
                                        </Button>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    {/* Coluna da direita: Área reservada para futuras funcionalidades */}
                    <div className="w-full md:w-1/2 flex flex-col min-h-[200px] border border-dashed border-[#D4D4D4] bg-[#FAFAFA] rounded-md items-center justify-center">
                        {/* Placeholder para futuras funcionalidades */}
                        <span className="text-muted-foreground text-sm italic">Área reservada para futuras funcionalidades</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
