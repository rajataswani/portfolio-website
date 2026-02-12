'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { EXPERIENCE } from '@/lib/constants';
import { scrollFadeIn, staggerContainer } from '@/lib/animations';

export default function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Group experiences by company
    const groupedExperiences = EXPERIENCE.reduce((acc, exp) => {
        const companyId = exp.companyId || exp.id.toString();
        if (!acc[companyId]) {
            acc[companyId] = [];
        }
        acc[companyId].push(exp);
        return acc;
    }, {} as Record<string, typeof EXPERIENCE>);

    return (
        <section id="experience" ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-primary-light/30" />

            <motion.div
                className="relative z-10 max-w-5xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div variants={scrollFadeIn} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Experience
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-purple-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-purple via-accent-blue to-accent-cyan hidden md:block" />

                    {/* Timeline items */}
                    <div className="space-y-8 sm:space-y-12">
                        {Object.entries(groupedExperiences).map(([companyId, experiences], groupIndex) => (
                            <motion.div
                                key={companyId}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ delay: groupIndex * 0.2, duration: 0.6 }}
                                className="relative"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 sm:left-8 top-6 w-4 h-4 rounded-full bg-gradient-purple-cyan border-4 border-primary transform -translate-x-1/2 hidden md:block" />

                                {/* Company Card */}
                                <div className="md:ml-16 glass rounded-xl p-6 sm:p-8 hover:shadow-glow-md transition-all duration-300">
                                    {/* Company Header */}
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-accent-cyan">
                                                {experiences[0].organization}
                                            </h3>
                                        </div>
                                        {experiences[0].current && (
                                            <span className="px-3 py-1 text-xs sm:text-sm bg-gradient-purple-cyan rounded-full text-white font-semibold w-fit">
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    {/* Nested Timeline for Multiple Roles */}
                                    <div className="space-y-6 relative">
                                        {/* Internal timeline line for multiple roles */}
                                        {experiences.length > 1 && (
                                            <div className="absolute left-2 top-0 bottom-0 w-px bg-accent-purple/30" />
                                        )}

                                        {experiences.map((exp, roleIndex) => (
                                            <div key={exp.id} className="relative">
                                                {/* Internal timeline dot */}
                                                {experiences.length > 1 && (
                                                    <div className="absolute left-2 top-2 w-2 h-2 rounded-full bg-accent-cyan transform -translate-x-1/2" />
                                                )}

                                                {/* Role Content */}
                                                <div className={experiences.length > 1 ? 'ml-6' : ''}>
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                                                        <h4 className="text-base sm:text-lg font-bold text-text-primary">
                                                            {exp.title}
                                                        </h4>
                                                        <span className="px-3 py-1 text-xs bg-primary-light rounded-full text-text-secondary border border-accent-purple/30 w-fit">
                                                            {exp.period}
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    <ul className="space-y-2">
                                                        {exp.description.map((item, i) => (
                                                            <li key={i} className="flex items-start text-xs sm:text-sm text-text-secondary">
                                                                <span className="text-accent-purple mr-2 mt-1">▸</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
