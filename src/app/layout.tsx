import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Montserrat as montse } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-switch/provider"

const fontSans = montse({
  subsets: ["latin"],
  variable: "--font-montse",
})


// Dynamic metadata
export async function generateMetadata() {
  return {
    title: {
      default: "Cafe desde que Dios amanece",
      template: "%s | Cafe desde que Dios amanece",
    },
    description: "Explora cómo creamos un espacio acogedor donde taza de café cuenta una historia. Descubre nuestros valores centrados en la calidad y la comunidad, diseñados para ofrecerte una experiencia única en cada visita.",
    keywords: ['Zevlogix', 'Zevlogix ERP Modular', 'Zevlogix ERP', 'Zevelogix ERP', 'Efficiency Boost erp ERP', 'ERP for business growth', 'zevelow erp', 'Zevelow'],
    icons: {
      icon: [
        './favicon.ico?v=4',
      ],
      apple: [
        '/apple-touch-icon.png?v=4',
      ],
      shortcut: [
        '/apple-touch-icon.png',
      ],
    },
    manifest: '/site.webmanifest',
  }
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-montse antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
