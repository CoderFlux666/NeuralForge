
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"

export function AdvancedHeroText() {
    const ref = useRef(null)
    const { scrollY } = useScroll()

    // Scroll Parallax: Text moves down slower than scroll (0.5x speed) creating depth
    const y = useTransform(scrollY, [0, 500], [0, 200])

    // Mouse Parallax Logic
    const x = useMotionValue(0)
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 })
    const yMouse = useMotionValue(0)
    const mouseY = useSpring(yMouse, { stiffness: 50, damping: 20 })

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const xPos = (clientX - left) / width - 0.5
        const yPos = (clientY - top) / height - 0.5

        x.set(xPos * 30) // Move max 30px horizontally
        yMouse.set(yPos * 30) // Move max 30px vertically
    }

    const wordVariants = {
        hidden: { opacity: 0, y: 50, rotateX: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                damping: 12,
                stiffness: 100
            }
        })
    }

    return (
        <motion.div
            ref={ref}
            style={{ y, perspective: 1000 }} // Apply scroll parallax + perspective
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); yMouse.set(0) }}
            className="w-full max-w-[1400px] mx-auto mb-12 cursor-default"
        >
            <motion.h1
                style={{ x: mouseX, y: mouseY, rotateX: mouseY, rotateY: mouseX }}
                className="text-[80px] md:text-[100px] lg:text-[130px] font-black tracking-tight text-black leading-[0.9]"
            >
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-0">
                    {/* Line 1: Super fast motion */}
                    {["Super", "fast", "motion"].map((word, i) => (
                        <motion.span
                            key={word}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-0">
                    {/* Line 2: for every team */}
                    {["for", "every", "team"].map((word, i) => (
                        <motion.span
                            key={word}
                            custom={i + 3} // Continue delay index
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>
            </motion.h1>
        </motion.div>
    )
}
