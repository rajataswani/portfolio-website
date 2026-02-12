/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'in962.wordpress.com',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

export default nextConfig;
