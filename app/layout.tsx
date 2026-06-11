// import type React from "react";
// import type { Metadata } from "next";
// import { Playfair_Display, Inter } from "next/font/google";
// import { Analytics } from "@vercel/analytics/next";
// import "./globals.css";
// import { Footer } from "@/components/footer";
// import { Header } from "@/components/header";
// import { Toaster } from "@/components/ui/sonner";

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// export const metadata: Metadata = {
//   title: "Drop Me - Smart Recycling Solution",
//   description:
//     "Join Drop Me and earn rewards while helping the environment through smart recycling.",
//   generator: "v0.app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
//       >
//         {children}
//         <Analytics />
//         <Toaster />
//       </body>
//     </html>
//   );
// }

import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Drop Me - Smart Recycling Solution",
  description:
    "Join Drop Me and earn rewards while helping the environment through smart recycling.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ReduxProvider>{children}</ReduxProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
