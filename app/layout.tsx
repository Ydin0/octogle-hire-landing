import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { display, sans, mono } from "@/lib/fonts";
import "./globals.css";

const META_PIXEL_ID = "1614640659743336";
const LEADPIPE_SRC =
  "https://leadpipe.aws53.cloud/p/ae6e8671-549b-4d7b-9445-3b01ce023379.js";

export const metadata: Metadata = {
  metadataBase: new URL("https://try.octoglehire.com"),
  title: "Octogle Hire — A senior UK-embedded engineer from £1,500/mo",
  description:
    "Same work as a £99,768/yr UK senior dev, from £1,500 a month. A senior engineer embedded in your team — your product, your repo, your ownership. Three profiles in 48 hours, no placement fee.",
  openGraph: {
    title: "Octogle Hire — A senior embedded engineer from £1,500/mo",
    description:
      "Same work as a £99,768/yr UK senior dev, from £1,500 a month. Three profiles in 48 hours, no placement fee.",
    url: "https://try.octoglehire.com",
    siteName: "Octogle Hire",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f9fa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        {children}

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {/* Leadpipe visitor tracking */}
        <Script id="leadpipe" src={LEADPIPE_SRC} strategy="afterInteractive" />
      </body>
    </html>
  );
}
