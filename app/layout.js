import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Solana Memecoin Dashboard",
  description: "Track trending Solana memecoins and community sentiment in real-time",
  keywords: "solana, memecoin, cryptocurrency, dashboard, sentiment, trading",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
