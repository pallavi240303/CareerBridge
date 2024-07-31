const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "k5eneba7bqn9ebsm.public.blob.vercel-storage.com",
            },
        ],
    },
};

module.exports = nextConfig
