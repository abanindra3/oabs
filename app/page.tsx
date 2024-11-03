import React from 'react';
import Link from 'next/link';
import Chatbox from '@/components/ui/Chatbox';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Tag, Info, User, Search, Package, Sparkles, Grid3X3, LogIn } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    description: "High-quality sound with long battery life",
    image: "/images/earbuds.webp",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Track your fitness and stay connected",
    image: "/images/smartwatch.webp",
    badge: "New"
  }
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                SAVVYCART
              </h1>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
              <div className="h-6 w-px bg-gray-200" />
              <Link href="/products">
                <Button variant="ghost" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
          
          <nav className="flex items-center justify-center bg-gray-50 rounded-lg p-2">
            <div className="flex space-x-1 w-full max-w-2xl justify-between">
              <Link href="/deals" className="flex-1">
                <Button variant="ghost" className="w-full hover:bg-white" size="sm">
                  <Tag className="h-4 w-4 mr-2" />
                  Deals
                </Button>
              </Link>
              <Link href="/new-arrivals" className="flex-1">
                <Button variant="ghost" className="w-full hover:bg-white" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  New Arrivals
                </Button>
              </Link>
              <Link href="/categories" className="flex-1">
                <Button variant="ghost" className="w-full hover:bg-white" size="sm">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Categories
                </Button>
              </Link>
              <Link href="/about" className="flex-1">
                <Button variant="ghost" className="w-full hover:bg-white" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex-grow p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">AI Shopping Assistant</h2>
              <p className="text-gray-600 mb-4">
                Get personalized product recommendations and answers to your shopping questions
              </p>
              <Chatbox />
            </div>
          </div>
          
          <div className="md:w-1/3 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
              <div className="space-y-4">
                {featuredProducts.map((product) => (
                  <Link href={`/products#product-${product.id}`} key={product.id}>
                    <Card className="hover:shadow-lg transition-shadow duration-200">
                      <CardHeader className="p-4">
                        <div className="relative h-48 mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          />
                          <Badge className="absolute top-2 right-2" variant="secondary">
                            {product.badge}
                          </Badge>
                        </div>
                        <CardTitle className="flex items-center justify-between text-lg">
                          {product.name}
                          <span className="text-primary font-bold">
                            ${product.price}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-gray-600 text-sm">{product.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">🔥 Flash Sale - Up to 50% off</p>
                  <p className="text-sm font-medium">🎁 Buy 2, Get 1 Free on Electronics</p>
                  <p className="text-sm font-medium">⚡ Limited Time Offers</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
