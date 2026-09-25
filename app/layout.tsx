import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { display, sans, mono } from "@/lib/fonts";
import "./globals.css";

const META_PIXEL_ID = "1614640659743336";
const LEADPIPE_SRC =
  "https://leadpipe.aws53.cloud/p/ae6e8671-549b-4d7b-9445-3b01ce023379.js";
const CLARITY_ID = "yi3brud3l6";
const GOOGLE_ADS_ID = "AW-18440423872";

export const metadata: Metadata = {
  metadataBase: new URL("https://try.octoglehire.com"),
  title: "Octogle Hire | A full-time engineer embedded in your team, from £1,500/mo",
  description:
    "Full-time engineers embedded in your team, from £1,500 a month. Juniors to seniors at a fraction of a UK hire. Your repo, your ownership. Three profiles in 48 hours, no placement fee.",
  openGraph: {
    title: "Octogle Hire | An embedded engineer from £1,500/mo",
    description:
      "Full-time engineers from £1,500 a month, a fraction of a UK hire. Three profiles in 48 hours, no placement fee.",
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

        {/* Google tag (Google Ads). Plain <script> tags, not next/script:
            Google's tag detection reads the initial HTML, and afterInteractive
            injects after hydration, so it would report "no Google tag found".
            Config only here; the lead conversion fires in Funnel.tsx. */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <script
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`,
          }}
        />

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

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      </body>
    </html>
  );
}
