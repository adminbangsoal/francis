/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/latihan-soal",
        destination: "/latihan-soal/pu",
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bangsoal.s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "bangsoal.s3-ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
