/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Preserve the original post-booking URL Leadey redirects to.
  async rewrites() {
    return {
      // The redesigned landing page is a static Claude Design export in
      // public/lp.html; serve it at the root. /us is the same page in US mode
      // (it reads the path). The previous page lives at /v1.
      beforeFiles: [
        { source: "/", destination: "/lp.html" },
        { source: "/us", destination: "/lp.html" },
      ],
      afterFiles: [{ source: "/booked.html", destination: "/booked" }],
    };
  },
};

export default nextConfig;
