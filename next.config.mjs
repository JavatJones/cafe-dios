/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol:"https",
                hostname:"sadwrroyzkzfdgiiymmz.supabase.co"
            }
        ]
    }
};

export default nextConfig;
