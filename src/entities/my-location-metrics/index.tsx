import { Tile } from '@/shared/ui/tile';
import styles from './styles.module.scss';

export function MyLocationMetrics() {
    return (
        <div className={`flex h-18 w-full flex-nowrap gap-4 ${styles.scrollX}`}>
            <div className="bg-card flex h-full w-52 shrink-0 items-center rounded-md border px-4 shadow-sm">
                <Tile
                    leading={
                        <i className="ph-doutone ph ph-cloud-sun text-secondary text-3xl"></i>
                    }
                    title={<span className="">Flores da Cunha</span>}
                    value={
                        <div className="flex flex-col">
                            <span className="text-xl font-medium">20°</span>
                            {/* <div className="text-muted-foreground flex items-center text-sm font-normal">
                                <span className="mr-2">Min 22°</span>
                                <span>Max 18°</span>
                            </div> */}
                        </div>
                    }
                ></Tile>
            </div>
            <div className="flex h-full w-fit items-center gap-4 rounded-md bg-[#3C6FEF] px-4 py-1 shadow-sm">
                <div className="bg-card flex items-center justify-center rounded-full p-2">
                    <i className="ph-duotone ph-drop-half-bottom text-2xl text-[#3C6FEF]"></i>
                </div>
                <div className="flex flex-col">
                    <div className="text-card text-sm font-normal opacity-60">
                        Umidade
                    </div>
                    <div className="text-card flex items-end gap-1 font-medium">
                        <div className="text-xl">60</div>
                        <span className="text-sm">%</span>
                    </div>
                </div>
            </div>
            <div className="flex h-full w-fit shrink-0 items-center gap-4 rounded-md bg-[#1E1E1E] px-4 py-1 shadow-sm">
                <div className="bg-card flex items-center justify-center rounded-full p-2">
                    <i className="ph-duotone ph-ruler text-2xl text-[#1E1E1E]"></i>
                </div>
                <div className="flex flex-col">
                    <div className="text-card text-sm font-normal opacity-60">
                        Espaço disponível
                    </div>
                    <div className="text-card flex items-end gap-1 font-medium">
                        <div className="text-xl">10</div>
                        <span className="text-sm">m²</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
