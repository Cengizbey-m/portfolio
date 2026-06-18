import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // Community folded into the profile (reviews -> profile comments).
      { source: "/community", destination: "/", permanent: true },
      { source: "/community/:path*", destination: "/", permanent: true },
      // Projects index folded into the Library (case studies stay at /projects/[slug]).
      { source: "/projects", destination: "/library", permanent: true },
    ];
  },
};

export default nextConfig;
