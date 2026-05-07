'use client';

import { motion } from 'framer-motion';
export default function LogoAnimada() {
    const texto = "PetroTrend";

    return (
        <div className="flex gap-0.5">
            {texto.split("").map((letra, index) => (
                <motion.span
                    key={index}
                    className={`text-4xl font-extrabold ${letra === "P" || index > 4 ? "text-blue-500" : "text-white"}`}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1,
                    }}
                >
                    {letra}
                </motion.span>
            ))}
        </div>
    );
}
