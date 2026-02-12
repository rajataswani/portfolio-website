'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface GlowCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: 'purple' | 'blue' | 'cyan';
    tilt?: boolean;
    onClick?: () => void;
}

export default function GlowCard({
    children,
    className = '',
    glowColor = 'purple',
    tilt = false,
    onClick,
}: GlowCardProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const glowColors = {
        purple: 'rgba(139, 92, 246, 0.5)',
        blue: 'rgba(59, 130, 246, 0.5)',
        cyan: 'rgba(6, 182, 212, 0.5)',
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!tilt) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0.5, y: 0.5 });
    };

    const rotateX = tilt ? (mousePosition.y - 0.5) * -10 : 0;
    const rotateY = tilt ? (mousePosition.x - 0.5) * 10 : 0;

    return (
        <motion.div
            className={`relative glass rounded-xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={{
                scale: 1.02,
                boxShadow: `0 0 40px ${glowColors[glowColor]}`,
            }}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{
                duration: 0.3,
                ease: 'easeOut',
            }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            {/* Gradient border effect */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `linear-gradient(135deg, ${glowColors[glowColor]}, transparent)`,
                    zIndex: -1,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    boxShadow: `0 0 30px ${glowColors[glowColor]}`,
                    zIndex: -2,
                }}
            />
        </motion.div>
    );
}
