import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:lang(fr|en)/services/retraite",
        destination: "/:lang#services",
        permanent: false,
      },
      {
        source: "/:lang(fr|en)/services/retiree",
        destination: "/:lang#services",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
