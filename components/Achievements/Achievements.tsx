'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GlowCard from '../shared/GlowCard';
import { ACHIEVEMENTS } from '@/lib/constants';
import { scrollFadeIn, staggerContainer } from '@/lib/animations';

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, isInView: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return count;
}

export default function Achievements() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="achievements" ref={ref} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
            {/* Background */}
            <div className="absolute inset-0 bg-primary" />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section title */}
                <motion.div variants={scrollFadeIn} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Achievements
                    </h2>
                    <div className="w-16 sm:w-20 h-1 bg-gradient-purple-cyan mx-auto rounded-full" />
                </motion.div>

                {/* Achievements grid - 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {ACHIEVEMENTS.map((achievement, index) => (
                        <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

function AchievementCard({
    achievement,
    index,
    isInView,
}: {
    achievement: typeof ACHIEVEMENTS[0];
    index: number;
    isInView: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
        >
            <GlowCard className="h-full" tilt>
                <div className="text-center space-y-4">
                    {/* Icon */}
                    <div className="text-4xl sm:text-5xl mb-4">{achievement.icon}</div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                        {achievement.title}
                    </h3>
                    {achievement.subtitle && (
                        <p className="text-xs sm:text-sm text-text-tertiary">{achievement.subtitle}</p>
                    )}

                    {/* Divider after header for GATE card */}
                    {achievement.gateResults && (
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
                    )}

                    {/* Stats */}
                    <div className="space-y-3 pt-4">
                        {/* GATE Results - Special handling for merged card */}
                        {achievement.gateResults && (
                            <div className="space-y-4">
                                {achievement.gateResults.map((result: any, idx: number) => (
                                    <div key={idx}>
                                        {idx > 0 && (
                                            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent mb-4" />
                                        )}
                                        <p className="text-sm font-semibold text-accent-cyan mb-2">{result.paper}</p>
                                        <div className="text-xl sm:text-2xl font-bold gradient-text">
                                            AIR {result.rank.toLocaleString()}
                                        </div>
                                        <div className="text-xs sm:text-sm text-text-secondary mt-1">
                                            among {result.totalCandidates.toLocaleString()} candidates
                                        </div>
                                        <div className="text-lg font-bold text-accent-cyan mt-2">
                                            {result.percentile.toFixed(2)}%ile
                                        </div>
                                        {/* Percentile bar */}
                                        <div className="w-full bg-primary-light rounded-full h-2 mt-2 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-purple-cyan rounded-full"
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${result.percentile}%` } : { width: 0 }}
                                                transition={{ delay: index * 0.1 + idx * 0.3 + 0.5, duration: 1 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Details for Hackathons and Teaching cards */}
                        {achievement.details && (
                            <div className="text-left space-y-1 pt-2">
                                {achievement.details.map((detail, i) => (
                                    <p
                                        key={i}
                                        className={`text-xs sm:text-sm leading-relaxed ${detail === '' ? 'h-2' :
                                                detail.startsWith('•') ? 'text-text-secondary pl-2' :
                                                    detail.startsWith('🥇') ? 'text-accent-cyan font-semibold' :
                                                        detail.includes('Built scalable') || detail.includes('Recognized') ? 'text-text-tertiary italic mt-2' :
                                                            'text-text-secondary'
                                            }`}
                                    >
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        )}

                        {achievement.year && (
                            <div className="text-xs text-text-tertiary pt-3 italic border-t border-primary-light/30 mt-4">
                                {achievement.year}
                            </div>
                        )}
                    </div>
                </div>
            </GlowCard>
        </motion.div>
    );
}
