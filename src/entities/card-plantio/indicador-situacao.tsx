type IndicadorSituacaoProps = {
    progresSituacao: number;
};
export function IndicadorSituacao({ progresSituacao }: IndicadorSituacaoProps) {
    const situacaoDeg = progresSituacao * 360;
    const isReady = progresSituacao >= 1;

    return (
        <div className="relative flex h-10 w-10 items-center justify-center">
            <div
                className={`absolute inset-0 rounded-full`}
                style={{
                    background: `conic-gradient(var(--primary) 360deg, var(--muted) 0deg)`,
                }}
            />
            <div className="bg-card relative z-[1] flex h-8 w-8 items-center justify-center rounded-full">
                {isReady ? (
                    <>
                        <i className="ph ph-plant text-primary text-xl"></i>
                        <div className="bg-primary absolute inset-0 rounded-full opacity-20"></div>
                    </>
                ) : (
                    <div
                        className={`absolute inset-0 m-[2px] rounded-full`}
                        style={{
                            background: `conic-gradient(var(--primary) ${situacaoDeg}deg, var(--muted) 0deg)`,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
