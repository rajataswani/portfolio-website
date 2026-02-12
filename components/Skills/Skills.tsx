'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SKILLS } from '@/lib/constants';
import { scrollFadeIn, staggerContainer } from '@/lib/animations';

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Combine all skills into categories
    const allSkills = [
        { category: 'Languages', items: SKILLS.languages },
        { category: 'Frameworks & Libraries', items: SKILLS.frameworks },
        { category: 'Blockchain & Web3', items: SKILLS.blockchain },
        { category: 'Tools & Others', items: SKILLS.other },
    ];

    return (
        <section id="skills" ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-primary" />

            <motion.div
                className="relative z-10 max-w-6xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div variants={scrollFadeIn} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Skills & Technologies
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-purple-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Single consolidated card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-xl p-6 sm:p-10"
                >
                    <div className="space-y-8">
                        {allSkills.map((skillGroup, groupIndex) => (
                            <div key={skillGroup.category}>
                                <h3 className="text-lg sm:text-xl font-bold mb-4 text-accent-purple">
                                    {skillGroup.category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                            transition={{
                                                delay: groupIndex * 0.1 + skillIndex * 0.05,
                                                duration: 0.4,
                                            }}
                                            whileHover={{ scale: 1.1, y: -5 }}
                                            className="px-4 py-2 bg-primary-light rounded-lg text-text-primary font-medium hover:bg-gradient-purple-cyan hover:text-white transition-all cursor-default text-sm sm:text-base"
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Divider between categories except last */}
                                {groupIndex < allSkills.length - 1 && (
                                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
