'use client';

import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

interface ParticleFieldProps {
    particleCount?: number;
}

export default function ParticleField({ particleCount = 100 }: ParticleFieldProps) {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: 'grab',
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            links: {
                                opacity: 0.5,
                            },
                        },
                    },
                },
                particles: {
                    color: {
                        value: ['#8b5cf6', '#3b82f6', '#06b6d4'],
                    },
                    links: {
                        color: '#8b5cf6',
                        distance: 150,
                        enable: true,
                        opacity: 0.2,
                        width: 1,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: true,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: particleCount,
                    },
                    opacity: {
                        value: { min: 0.3, max: 1 },
                        animation: {
                            enable: true,
                            speed: 1,
                        },
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 w-full h-full"
        />
    );
}
