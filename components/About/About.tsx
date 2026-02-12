'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { EDUCATION } from '@/lib/constants';
import { scrollFadeIn, staggerContainer } from '@/lib/animations';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-primary-light/30" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent-purple rounded-full filter blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent-blue rounded-full filter blur-3xl animate-pulse-slow animation-delay-400" />
            </div>

            <motion.div
                className="relative z-10 max-w-6xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div variants={scrollFadeIn} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        About Me
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-purple-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Content - Image on left, cards on right for desktop */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Profile Image */}
                    <motion.div
                        variants={scrollFadeIn}
                        className="w-full lg:w-2/5 flex justify-center lg:justify-start"
                    >
                        <div className="relative w-80 h-[28rem] sm:w-96 sm:h-[32rem] rounded-xl overflow-hidden glass">
                            <Image
                                src="https://in962.wordpress.com/wp-content/uploads/2026/02/dsc01797-e1770913797280.jpeg"
                                alt="Rajat Aswani speaking at AWS SCD 2025"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                        </div>
                    </motion.div>

                    {/* Cards on the right */}
                    <div className="flex-1 space-y-6">
                        {/* Introduction Card */}
                        <motion.div variants={scrollFadeIn}>
                            <div className="glass rounded-xl p-6 sm:p-8 hover:shadow-glow-md transition-all duration-300">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-accent-purple">
                                    👋 Introduction
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                                    I'm a passionate Computer Engineering student with a strong foundation in{' '}
                                    <span className="text-accent-cyan font-semibold">Data Structures & Algorithms</span>,{' '}
                                    <span className="text-accent-purple font-semibold">AI</span> and{' '}
                                    <span className="text-accent-blue font-semibold">Blockchain Technology</span>.
                                </p>
                                <p className="text-text-secondary leading-relaxed mt-4 text-sm sm:text-base bg-gradient-to-r from-accent-purple/10 to-accent-cyan/10 p-3 rounded-lg border border-accent-purple/20">
                                    From encoding automata in adjacency matrices to coalescing segment trees into cache lines — I prefer invariants proven, states minimized, and complexities asymptotically tight.
                                </p>
                            </div>
                        </motion.div>

                        {/* Education Card */}
                        <motion.div variants={scrollFadeIn}>
                            <div className="glass rounded-xl p-6 sm:p-8 hover:shadow-glow-md transition-all duration-300">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-accent-blue">
                                    🎓 Education
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-text-primary font-semibold text-sm sm:text-base">{EDUCATION.degree}</p>
                                    <p className="text-text-secondary text-sm sm:text-base">{EDUCATION.institution}</p>
                                    <p className="text-text-tertiary text-xs sm:text-sm">{EDUCATION.period}</p>
                                    <div className="mt-4 inline-block px-4 py-2 bg-gradient-purple-cyan rounded-lg">
                                        <span className="text-white font-bold text-sm sm:text-base">CGPA: {EDUCATION.cgpa}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
