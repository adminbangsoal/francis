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
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // Allow unsafe-eval for Midtrans Snap script
  async headers() {
    return [
      {
        // Apply to langganan page and all sub-paths
        source: "/langganan/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://snap-assets.al-pc-id-b.cdn.gtflabs.io https://api.sandbox.midtrans.com https://app.sandbox.midtrans.com https://pay.google.com https://js-agent.newrelic.com https://bam.nr-data.net https://gwk.gopayapi.com https://www.googletagmanager.com 'sha256-v8V2Y+fbkBMghFEm+ALwcLXqYbjG/N9246T4W4pt1JM='; object-src 'none'; frame-src 'self' https://app.sandbox.midtrans.com;",
          },
        ],
      },
      {
        // Also apply to exact /langganan path
        source: "/langganan",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://snap-assets.al-pc-id-b.cdn.gtflabs.io https://api.sandbox.midtrans.com https://app.sandbox.midtrans.com https://pay.google.com https://js-agent.newrelic.com https://bam.nr-data.net https://gwk.gopayapi.com https://www.googletagmanager.com 'sha256-v8V2Y+fbkBMghFEm+ALwcLXqYbjG/N9246T4W4pt1JM='; object-src 'none'; frame-src 'self' https://app.sandbox.midtrans.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
