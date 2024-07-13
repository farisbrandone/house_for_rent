/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tkvtphatpjsobxkwbqmd.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
