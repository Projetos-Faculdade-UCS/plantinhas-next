import { Repositories } from '@/shared/api/repositories';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function PlantaPage({
    params,
}: {
    params: Promise<{ plantaId: string }>;
}) {
    const { plantaId } = await params;
    const planta = await Repositories.plantas.getPlanta(Number(plantaId));

    return (
        <>
            <div className="flex flex-col gap-1">
                <Link
                    href="/catalogo"
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                >
                    <i className="ph ph-arrow-left" />
                    <p className="text-base">Voltar</p>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-4 items-start">
                <div className="flex-shrink-0 w-56 flex flex-col items-center">
                    <Image
                        src={planta.data.foto || '/assets/plantas/girassol.png'}
                        alt={`Foto da planta ${planta.data.nome}`}
                        width={224}
                        height={224}
                        className="object-cover rounded-lg"
                    />
                    <Button
                        asChild
                        variant={'default'}
                        className="mt-4 flex w-full items-center justify-center gap-2 text-base bg-primary"
                    >   
                        <Link href="/plantar" >
                            <i className="ph ph-potted-plant text-xl"></i>
                            <span className="text-base">
                                Plantar
                            </span>                    
                        </Link>
                    </Button>
                </div>
                <div className="flex-1 flex flex-col gap-8">
                    {/* Sessão 1: Identificação da planta */}
                    <section>
                        <h2 className="text-3xl font-semibold mb-0">{planta.data.nome}</h2>
                        <h4 className="text-lg italic text-muted-foreground">{planta.data.nomeCientifico}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Link
                                href={`/catalogo/?categoria=${planta.data.categoria.id}`}
                                className="rounded-md bg-primary text-white px-3 py-1 text-sm font-medium"
                            >
                                {planta.data.categoria.nome}
                            </Link>
                            {planta.data.subcategorias.map((sub) => (
                                <Link
                                    key={sub.id}
                                    href={`/catalogo/?subcategoria=${sub.id}`}
                                    className="rounded-md bg-background border border-[#D4D4D4] px-3 py-1 text-sm font-medium"
                                >
                                    {sub.nome}
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Sessão 2: Dificuldade */}
                    <section>
                        <div className="flex items-center gap-4">
                            <span className="text-5xl font-bold">{planta.data.dificuldade.value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                            <div className="flex flex-col">
                                <span className="text-sm text-muted-foreground tracking-wider">Dificuldade</span>
                                <span className="text-lg font-semibold">{planta.data.dificuldade.label}</span>
                            </div>
                        </div>
                        {/* Indicadores de dificuldade */}
                        <div className="flex gap-2 mt-2">
                            {Array.from({ length: 5 }).map((_, idx) => {
                                const value = planta.data.dificuldade.value - idx;
                                let svgName = '0.svg';
                                if (value >= 0.85) svgName = '1.svg';
                                else if (value >= 0.5) svgName = '0.7.svg';
                                else if (value >= 0.15) svgName = '0.3.svg';
                                return (
                                    <Image
                                        key={idx}
                                        src={`/assets/indicadores-dificuldade/${svgName}`}
                                        width={32}
                                        height={32}
                                        className="select-none"
                                        draggable={false}
                                        alt=""
                                    />
                                );
                            })}
                        </div>
                    </section>

                    {/* Sessão 3: Condições ideais */}
                    <section>
                        <h3 className="text-muted-foreground text-base">Condições ideais</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-14 h-14 text-5xl">
                                {planta.data.estacaoIdeal === 'Outono' && <i className="ph ph-leaf text-orange-400" />}
                                {planta.data.estacaoIdeal === 'Verão' && <i className="ph ph-sun text-yellow-400" />}
                                {planta.data.estacaoIdeal === 'Inverno' && <i className="ph ph-snowflake text-sky-400" />}
                                {planta.data.estacaoIdeal === 'Primavera' && <i className="ph ph-flower-lotus text-pink-400" />}
                                {planta.data.estacaoIdeal === 'Todo o ano' && <i className="ph ph-calendar-blank text-zinc-400" />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">{planta.data.estacaoIdeal}</span>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-sm text-muted-foreground">Mín: {planta.data.temperatura.minima}°C</span>
                                    <span className="text-sm text-muted-foreground">Máx: {planta.data.temperatura.maxima}°C</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
