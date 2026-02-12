'use client';

import { motion } from 'framer-motion';

export default function Loader() {
    const dotVariants = {
        initial: { y: 0 },
        animate: { y: -20 },
    };

    const containerVariants = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background-primary via-background-secondary to-background-primary"
            variants={containerVariants}
            initial="initial"
            exit="exit"
        >
            <div className="flex gap-3">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan"
                        variants={dotVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            delay: index * 0.15,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
