/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Preserve the original post-booking URL Leadey redirects to.
  async rewrites() {
    return [{ source: "/booked.html", destination: "/booked" }];
  },
};

export default nextConfig;
