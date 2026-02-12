'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PERSONAL_INFO } from '@/lib/constants';
import { scrollFadeIn, staggerContainer } from '@/lib/animations';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const contactInfo = [
        {
            icon: '📧',
            label: 'Email',
            value: PERSONAL_INFO.email,
            link: `mailto:${PERSONAL_INFO.email}`,
        },
        {
            icon: '📱',
            label: 'Phone',
            value: PERSONAL_INFO.phone,
            link: `tel:${PERSONAL_INFO.phone}`,
        },
        {
            icon: '💼',
            label: 'LinkedIn',
            value: 'linkedin.com/in/rajataswani',
            link: PERSONAL_INFO.linkedin,
        },
        {
            icon: '💻',
            label: 'GitHub',
            value: 'github.com/rajataswani',
            link: PERSONAL_INFO.github,
        },
    ];

    return (
        <section id="contact" ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-primary" />
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple rounded-full filter blur-3xl animate-pulse-slow" />
            </div>

            <motion.div
                className="relative z-10 max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div variants={scrollFadeIn} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Get In Touch
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-purple-cyan mx-auto rounded-full" />
                    <p className="text-base sm:text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                </motion.div>

                {/* Single consolidated contact card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-xl p-8 sm:p-10"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {contactInfo.map((contact, index) => (
                            <motion.a
                                key={contact.label}
                                href={contact.link}
                                target={contact.link.startsWith('http') ? '_blank' : undefined}
                                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-4 p-4 bg-primary-light rounded-lg hover:bg-gradient-purple-cyan/10 border border-transparent hover:border-accent-purple/50 transition-all duration-300 group"
                            >
                                {/* Icon */}
                                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                                    {contact.icon}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-bold text-accent-cyan mb-1">
                                        {contact.label}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-text-secondary truncate">
                                        {contact.value}
                                    </p>
                                </div>

                                {/* Arrow indicator */}
                                <div className="text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                                    →
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    variants={scrollFadeIn}
                    className="text-center mt-16 sm:mt-20 pt-8 border-t border-primary-light"
                >
                    <p className="text-sm sm:text-base text-text-tertiary">
                        © 2026 {PERSONAL_INFO.name}. Built with Next.js, Framer Motion, and ❤️
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
