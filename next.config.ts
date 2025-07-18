import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com', //fotos do google
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.jsdelivr.net', //fotos do mockoon
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost', //fotos do mockoon
                port: '8002',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
