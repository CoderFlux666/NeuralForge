import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function FlipWords() {
    const words = ["motion", "workflow", "ideas", "design"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-[1400px] mx-auto mb-12 text-center cursor-default">
            <h1 className="text-[80px] md:text-[100px] lg:text-[130px] font-black tracking-tight text-black leading-[0.9]">
                Super fast
                <br />

                {/* Container for the flipping word */}
                <div className="inline-flex items-center justify-center align-middle mx-4 h-[1em] overflow-hidden relative w-[5ch] text-[#B593FF]">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={words[index]}
                            initial={{ y: 50, opacity: 0, rotateX: -90 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            exit={{ y: -50, opacity: 0, rotateX: 90 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white rounded-xl px-2 shadow-xl border-2 border-[#B593FF]"
                            style={{ backfaceVisibility: "hidden" }}
                        >
                            {words[index]}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <br />
                for every team
            </h1>
        </div>
    );
}
