export default function CardPlanta() {
    return (
        <div className="relative h-72 w-64 overflow-hidden">
            {/* Card container */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
                {/* Background color */}
                <div className="bg-card absolute inset-0 rounded-lg border"></div>

                {/* Wavy top with smooth curves using SVG - fill only */}
                <svg
                    className="absolute top-0 left-0 w-full"
                    height="80"
                    viewBox="0 0 256 80"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 H256 V30 C256,30 220,30 180,15 C140,0 100,40 50,25 C20,15 0,30 0,30 V0 Z"
                        fill="none"
                    />
                </svg>

                {/* Border for ONLY the wavy part, not the top */}
                <svg
                    className="absolute top-0 left-0 w-full"
                    height="80"
                    viewBox="0 0 256 80"
                    preserveAspectRatio="none"
                    style={{ pointerEvents: 'none' }}
                >
                    <path
                        d="M0,30 C20,15 50,25 100,40 C150,55 200,0 256,30"
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="1"
                    />
                </svg>

                {/* Gray bar in the middle */}
                <div className="absolute top-1/2 left-1/2 h-3 w-3/5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#d3d3d3]" />

                {/* Green footer */}
                <div className="bg-primary absolute right-0 bottom-0 left-0 flex h-16 items-center justify-between rounded-b-lg px-4">
                    {/* Left pill button */}
                    <div className="h-8 w-24 rounded-full bg-[#7ab376]" />

                    {/* Plant icon */}
                    <i className="ph ph-potted-plant text-primary-foreground text-3xl" />

                    {/* Right circular button */}
                    <div className="h-8 w-10 rounded-full bg-[#7ab376]" />
                </div>
            </div>
        </div>
    );
}
