export function Trust() {
    const logos = [
        "ACME Corp",
        "Quantum",
        "Echo Valley",
        "NextGen",
        "Starlight",
        "Horizon"
    ]

    return (
        <section className="py-20 border-y border-slate-100 bg-white">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-medium text-slate-500 mb-8 uppercase tracking-widest">
                    Trusted by innovative teams worldwide
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-60">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="text-xl font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-default"
                        >
                            {logo}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
