// Framer Motion Animation Variants

export const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6 }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8 }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8 }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const nodePulse = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
            duration: 2,
            repeat: Infinity
        }
    }
};

export const unlockVariant = {
    locked: { rotate: 0 },
    unlocked: {
        rotate: [0, -10, 10, 0],
        transition: { duration: 0.6 }
    }
};

export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3 }
    }
};

export const glowEffect = {
    rest: { boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" },
    hover: {
        boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
        transition: { duration: 0.3 }
    }
};

// Scroll animation variants
export const scrollFadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
};

export const scrollSlideIn = (direction: 'left' | 'right' = 'left') => ({
    hidden: { opacity: 0, x: direction === 'left' ? -100 : 100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8
        }
    }
});

// Card hover effect with 3D tilt
export const cardHover = {
    rest: {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.3
        }
    }
};

// Particle animation
export const particleFloat = {
    animate: {
        y: [0, -20, 0],
        x: [0, 10, 0],
        transition: {
            duration: 6,
            repeat: Infinity
        }
    }
};

// Text reveal animation (character by character)
export const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.5
        }
    })
};

// Blockchain block animation
export const blockMining = {
    hidden: { opacity: 0, scale: 0, rotateY: -180 },
    visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
            duration: 0.8
        }
    }
};

// Connection line animation
export const lineDrawing = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 1.5
        }
    }
};

// Ripple effect for clicks
export const rippleEffect = {
    initial: { scale: 0, opacity: 1 },
    animate: {
        scale: 2,
        opacity: 0,
        transition: {
            duration: 0.6
        }
    }
};
