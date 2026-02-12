'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GlowCard from '../shared/GlowCard';
import { PROJECTS } from '@/lib/constants';
import { scrollFadeIn, staggerContainer } from '@/lib/animations';

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="projects" ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-primary-light/50" />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div variants={scrollFadeIn} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Featured Projects
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-purple-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <GlowCard className="h-full" tilt>
                                <div className="space-y-4">
                                    {/* Project header */}
                                    <div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-accent-cyan font-semibold">
                                            {project.subtitle}
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-start text-xs sm:text-sm text-text-tertiary">
                                                <span className="text-accent-purple mr-2">▸</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs sm:text-sm bg-primary-light rounded-full text-accent-blue border border-accent-blue/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4 pt-4">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-gradient-purple-cyan rounded-lg text-white font-semibold text-center hover:scale-105 transition-transform text-sm sm:text-base"
                                            >
                                                Live Demo →
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 border-2 border-accent-purple rounded-lg text-text-primary font-semibold text-center hover:bg-accent-purple/10 hover:scale-105 transition-all text-sm sm:text-base"
                                            >
                                                GitHub →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
