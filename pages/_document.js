import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Title for SEO */}
        <title>MZP-TOOLS</title>

        {/* Meta Tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="MZP-TOOLS: Your ultimate tool provider for all your needs." />
        <meta name="keywords" content="tools, MZP-TOOLS, online tools, equipment, professional tools" />
        <meta name="author" content="MZP-TOOLS" />

        {/* Open Graph for better shareability */}
        <meta property="og:title" content="MZP-TOOLS" />
        <meta property="og:description" content="Discover the best tools for your daily and professional needs at MZP-TOOLS." />
        <meta property="og:image" content="/images/logo.png" /> {/* Add correct path to your logo */}
        <meta property="og:url" content="https://www.mzp-tools.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MZP-TOOLS" />
        <meta name="twitter:description" content="Explore MZP-TOOLS for high-quality tools." />
        <meta name="twitter:image" content="/images/logo.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
