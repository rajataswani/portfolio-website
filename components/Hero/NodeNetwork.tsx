'use client';

import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

interface NodeNetworkProps {
    nodeCount?: number;
}

export default function NodeNetwork({ nodeCount = 15 }: NodeNetworkProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const animationRef = useRef<number>();
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize nodes in a radial pattern from center
        const initNodes = () => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const nodes: Node[] = [];

            // Central node
            nodes.push({
                x: centerX,
                y: centerY,
                vx: 0,
                vy: 0,
                radius: 8,
            });

            // Surrounding nodes in circles
            const rings = 2;
            const nodesPerRing = Math.floor((nodeCount - 1) / rings);

            for (let ring = 1; ring <= rings; ring++) {
                const ringRadius = ring * 150;
                const nodesInThisRing = ring === rings ? nodeCount - 1 - (rings - 1) * nodesPerRing : nodesPerRing;

                for (let i = 0; i < nodesInThisRing; i++) {
                    const angle = (i / nodesInThisRing) * Math.PI * 2;
                    nodes.push({
                        x: centerX + Math.cos(angle) * ringRadius,
                        y: centerY + Math.sin(angle) * ringRadius,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        radius: 4 + Math.random() * 3,
                    });
                }
            }

            nodesRef.current = nodes;
        };

        initNodes();

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const nodes = nodesRef.current;
            const mouse = mouseRef.current;

            // Update and draw nodes
            nodes.forEach((node, i) => {
                // Update position with slight drift
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Mouse interaction - slight attraction
                const dx = mouse.x - node.x;
                const dy = mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const force = (200 - distance) / 200 * 0.02;
                    node.vx += dx * force * 0.01;
                    node.vy += dy * force * 0.01;
                }

                // Damping
                node.vx *= 0.99;
                node.vy *= 0.99;

                // Draw connections to nearby nodes
                nodes.forEach((otherNode, j) => {
                    if (i >= j) return;

                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 250) {
                        const opacity = 1 - distance / 250;

                        // Gradient line
                        const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
                        gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.6})`);
                        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 0.8})`);
                        gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity * 0.6})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();

                        // Animated data flow particles
                        if (Math.random() > 0.98) {
                            const t = Math.random();
                            const px = node.x + dx * t;
                            const py = node.y + dy * t;

                            ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
                            ctx.beginPath();
                            ctx.arc(px, py, 2, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }
                });

                // Draw node
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
                gradient.addColorStop(0, 'rgba(139, 92, 246, 1)');
                gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.8)');
                gradient.addColorStop(1, 'rgba(6, 182, 212, 0.4)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#8b5cf6';
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [nodeCount]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'transparent' }}
        />
    );
}
