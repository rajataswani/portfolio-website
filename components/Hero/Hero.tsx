'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NodeNetwork from './NodeNetwork';
import ParticleField from './ParticleField';
import AnimatedText from '../shared/AnimatedText';
import { PERSONAL_INFO } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Hero() {
    const [nodeCount, setNodeCount] = useState(15);
    const [particleCount, setParticleCount] = useState(100);

    useEffect(() => {
        // Adjust particle and node count based on screen size
        const updateCounts = () => {
            const width = window.innerWidth;
            if (width < 768) {
                // Mobile
                setNodeCount(8);
                setParticleCount(50);
            } else if (width < 1024) {
                // Tablet
                setNodeCount(12);
                setParticleCount(75);
            } else {
                // Desktop
                setNodeCount(15);
                setParticleCount(100);
            }
        };

        updateCounts();
        window.addEventListener('resize', updateCounts);
        return () => window.removeEventListener('resize', updateCounts);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 gradient-bg" />

            {/* Particle field */}
            <div className="absolute inset-0 opacity-40">
                <ParticleField particleCount={particleCount} />
            </div>

            {/* Node network */}
            <div className="absolute inset-0 opacity-60">
                <NodeNetwork nodeCount={nodeCount} />
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Greeting */}
                <motion.div variants={fadeInUp} className="mb-4">
                    <span className="text-accent-cyan text-sm sm:text-base md:text-lg font-mono">
                        Hello, I'm
                    </span>
                </motion.div>

                {/* Name with animated text */}
                <motion.h1
                    variants={fadeInUp}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-white"
                >
                    <AnimatedText
                        text={PERSONAL_INFO.name}
                        variant="decrypt"
                        delay={0.5}
                        stagger={0.05}
                        className="text-white"
                    />
                </motion.h1>

                {/* Title */}
                <motion.h2
                    variants={fadeInUp}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-text-secondary mb-6 sm:mb-8"
                >
                    <AnimatedText
                        text={PERSONAL_INFO.title}
                        variant="slideUp"
                        delay={1.5}
                        stagger={0.03}
                    />
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={fadeInUp}
                    className="text-base sm:text-lg md:text-xl text-text-tertiary max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
                >
                    If it's exponential, <span className="text-accent-purple font-semibold">I prune it</span>.{' '}
                    If it's cyclic, <span className="text-accent-blue font-semibold">I break it</span>.{' '}
                    If it halts, <span className="text-accent-cyan font-semibold">I prove it</span>.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                >
                    <a
                        href="#projects"
                        className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-purple-cyan rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                    >
                        <span className="relative z-10">View My Work</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>

                    <a
                        href="#contact"
                        className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent-purple rounded-lg font-semibold text-text-primary hover:bg-accent-purple/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                    >
                        Get In Touch
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                    <div className="w-6 h-10 border-2 border-accent-purple rounded-full flex justify-center">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-accent-purple rounded-full mt-2"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
