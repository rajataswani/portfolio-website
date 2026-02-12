'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simplified continent coordinates (latitude, longitude pairs)
// This is a simplified representation - you can expand this for more detail
const continentData = {
    asia: [
        // India region (highlighted)
        [20, 77], [21, 78], [22, 79], [23, 80], [24, 81], [25, 82],
        [19, 76], [20, 75], [21, 74], [22, 73], [23, 72], [24, 71],
        [18, 77], [19, 78], [20, 79], [21, 80], [22, 81],
        [17, 76], [18, 75], [19, 74], [20, 73],
        [16, 77], [17, 78], [18, 79], [19, 80],
        [15, 76], [16, 75], [17, 74],
        [14, 77], [15, 78], [16, 79],
        [13, 76], [14, 75], [15, 74],
        [12, 77], [13, 78], [14, 79],
        [11, 76], [12, 75], [13, 74],
        [10, 77], [11, 78], [12, 79],
        [9, 76], [10, 75], [11, 74],
        [8, 77], [9, 78], [10, 79],
        // Rest of Asia (sample points)
        [35, 105], [36, 106], [37, 107], [38, 108], [39, 109],
        [40, 110], [41, 111], [42, 112], [43, 113], [44, 114],
        [30, 100], [31, 101], [32, 102], [33, 103], [34, 104],
        [25, 95], [26, 96], [27, 97], [28, 98], [29, 99],
        [45, 85], [46, 86], [47, 87], [48, 88], [49, 89],
        [50, 90], [51, 91], [52, 92], [53, 93], [54, 94],
    ],
    europe: [
        [50, 10], [51, 11], [52, 12], [53, 13], [54, 14],
        [55, 15], [56, 16], [57, 17], [58, 18], [59, 19],
        [45, 5], [46, 6], [47, 7], [48, 8], [49, 9],
        [40, 0], [41, 1], [42, 2], [43, 3], [44, 4],
    ],
    africa: [
        [0, 20], [1, 21], [2, 22], [3, 23], [4, 24],
        [-5, 25], [-4, 26], [-3, 27], [-2, 28], [-1, 29],
        [-10, 30], [-9, 31], [-8, 32], [-7, 33], [-6, 34],
        [10, 15], [11, 16], [12, 17], [13, 18], [14, 19],
    ],
    northAmerica: [
        [40, -100], [41, -99], [42, -98], [43, -97], [44, -96],
        [45, -95], [46, -94], [47, -93], [48, -92], [49, -91],
        [50, -90], [51, -89], [52, -88], [53, -87], [54, -86],
    ],
    southAmerica: [
        [-10, -60], [-9, -59], [-8, -58], [-7, -57], [-6, -56],
        [-15, -65], [-14, -64], [-13, -63], [-12, -62], [-11, -61],
        [-20, -70], [-19, -69], [-18, -68], [-17, -67], [-16, -66],
    ],
};

function latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}

function GlobePoints() {
    const pointsRef = useRef<THREE.Points>(null);
    const radius = 2.5;

    // Generate positions and colors for all continents
    const { positions, colors } = useMemo(() => {
        const positions: number[] = [];
        const colors: number[] = [];

        // India region (highlighted in cyan)
        const indiaCoords = continentData.asia.slice(0, 40); // First 40 points are India
        indiaCoords.forEach(([lat, lon]) => {
            const vec = latLonToVector3(lat, lon, radius);
            positions.push(vec.x, vec.y, vec.z);
            colors.push(0.02, 0.71, 0.83); // Cyan color for India
        });

        // Rest of Asia (subtle blue-gray)
        const restAsiaCoords = continentData.asia.slice(40);
        restAsiaCoords.forEach(([lat, lon]) => {
            const vec = latLonToVector3(lat, lon, radius);
            positions.push(vec.x, vec.y, vec.z);
            colors.push(0.3, 0.4, 0.5); // Blue-gray
        });

        // Other continents (subtle blue-gray)
        Object.entries(continentData).forEach(([continent, coords]) => {
            if (continent === 'asia') return; // Already processed
            coords.forEach(([lat, lon]) => {
                const vec = latLonToVector3(lat, lon, radius);
                positions.push(vec.x, vec.y, vec.z);
                colors.push(0.3, 0.4, 0.5); // Blue-gray
            });
        });

        return {
            positions: new Float32Array(positions),
            colors: new Float32Array(colors),
        };
    }, []);

    // Rotate the globe
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.002; // Slow rotation
        }
    });

    return (
        <Points ref={pointsRef} positions={positions} stride={3}>
            <PointMaterial
                transparent
                vertexColors
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
}

function AtmosphereGlow() {
    const glowRef = useRef<THREE.Mesh>(null);
    const baseRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (glowRef.current) {
            glowRef.current.rotation.y += 0.002;
        }
        if (baseRef.current) {
            baseRef.current.rotation.y += 0.002;
        }
    });

    // Fresnel shader for edge glow only
    const glowMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                c: { value: 0.1 },
                p: { value: 4.0 },
                glowColor: { value: new THREE.Color(0.14, 0.51, 0.96) }, // Bright blue
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 glowColor;
        uniform float c;
        uniform float p;
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          float intensity = pow(c - dot(vNormal, vPositionNormal), p);
          gl_FragColor = vec4(glowColor, 1.0) * intensity;
        }
      `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
        });
    }, []);

    return (
        <>
            {/* Dark base sphere for the globe body */}
            <mesh ref={baseRef}>
                <sphereGeometry args={[2.48, 64, 64]} />
                <meshBasicMaterial color="#0a0e1a" transparent opacity={0.9} />
            </mesh>

            {/* Atmospheric glow - edge only */}
            <mesh ref={glowRef} material={glowMaterial}>
                <sphereGeometry args={[2.55, 64, 64]} />
            </mesh>
        </>
    );
}

export default function Globe() {
    return (
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px]">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        premultipliedAlpha: false
                    }}
                    onCreated={({ gl }) => {
                        gl.setClearColor(0x000000, 0); // Fully transparent
                    }}
                >
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} />
                    <GlobePoints />
                    <AtmosphereGlow />
                </Canvas>
            </div>
        </div>
    );
}
