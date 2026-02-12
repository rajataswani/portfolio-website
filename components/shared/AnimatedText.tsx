'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
    text: string;
    className?: string;
    variant?: 'fadeIn' | 'slideUp' | 'typing' | 'decrypt';
    delay?: number;
    stagger?: number;
}

export default function AnimatedText({
    text,
    className = '',
    variant = 'fadeIn',
    delay = 0,
    stagger = 0.03,
}: AnimatedTextProps) {
    const characters = text.split('');

    const variants = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: (i: number) => ({
                opacity: 1,
                transition: {
                    delay: delay + i * stagger,
                    duration: 0.5,
                },
            }),
        },
        slideUp: {
            hidden: { opacity: 0, y: 20 },
            visible: (i: number) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: delay + i * stagger,
                    duration: 0.5,
                },
            }),
        },
        typing: {
            hidden: { opacity: 0, width: 0 },
            visible: (i: number) => ({
                opacity: 1,
                width: 'auto',
                transition: {
                    delay: delay + i * stagger,
                    duration: 0.1,
                },
            }),
        },
        decrypt: {
            hidden: { opacity: 0, filter: 'blur(10px)' },
            visible: (i: number) => ({
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                    delay: delay + i * stagger,
                    duration: 0.4,
                },
            }),
        },
    };

    return (
        <span className={`inline-block ${className}`}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={variants[variant]}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}

// Word-based animation variant
interface AnimatedWordsProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

export function AnimatedWords({
    text,
    className = '',
    delay = 0,
    stagger = 0.1,
}: AnimatedWordsProps) {
    const words = text.split(' ');

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: delay + index * stagger,
                        duration: 0.5,
                    }}
                    className="inline-block mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}
