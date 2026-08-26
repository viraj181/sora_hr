import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // Change this to 'https' if your images are served over HTTPS
        hostname: "s3.in-west2.purestore.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http", // Change this to 'https' if your images are served over HTTPS
        hostname: "200.234.38.38",
        port: "9000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
