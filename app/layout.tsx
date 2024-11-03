import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import Link from 'next/link'
import { ShoppingCart, User, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Shopping Assistant',
  description: 'Your personal AI-powered shopping experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold">AI Shop</Link>
                  <nav className="hidden md:ml-6 md:flex md:space-x-4">
                    <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
                    <Link href="/products" className="text-sm font-medium hover:text-primary">Products</Link>
                    <Link href="/deals" className="text-sm font-medium hover:text-primary">Deals</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <form className="hidden md:block">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                      <input
                        type="search"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </form>
                  <Link href="/cart">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Shopping Cart</span>
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </Link>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </header>
          <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="bg-muted mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shop</h3>
                  <ul className="space-y-2">
                    <li><Link href="/products" className="hover:underline">All Products</Link></li>
                    <li><Link href="/deals" className="hover:underline">Deals</Link></li>
                    <li><Link href="/new" className="hover:underline">New Arrivals</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">About</h3>
                  <ul className="space-y-2">
                    <li><Link href="/about" className="hover:underline">Our Story</Link></li>
                    <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                    <li><Link href="/press" className="hover:underline">Press</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                    <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                    <li><Link href="/shipping" className="hover:underline">Shipping</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:underline">Facebook</a></li>
                    <li><a href="#" className="hover:underline">Twitter</a></li>
                    <li><a href="#" className="hover:underline">Instagram</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center">
                <p>&copy; 2024 AI Shop. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}