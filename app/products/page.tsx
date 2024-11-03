"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Filter, Search, Star, SlidersHorizontal } from "lucide-react";
import Link from 'next/link';

const initialProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 79.99,
    description: "High-quality sound with long battery life",
    image: "/images/earbuds.webp",
    badge: "Best Seller",
    category: "Audio",
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Track your fitness and stay connected",
    image: "/images/smartwatch.webp",
    badge: "New",
    category: "Wearables",
    rating: 4.8,
    stock: 10
  },
  {
    id: 3,
    name: "Analog Watch",
    price: 799.99,
    description: "Track your fitness and stay connected",
    image: "/images/analogwatch.webp",
    badge: "New",
    category: "Wearables",
    rating: 4.9,
    stock: 5
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 49.99,
    description: "Keep your devices powered on the go",
    image: "/images/charger.webp",
    badge: "Popular",
    category: "Accessories",
    rating: 4.2,
    stock: 20
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const productRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const categories = ["All", ...new Set(initialProducts.map(p => p.category))];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const productId = parseInt(hash.replace('#product-', ''));
        scrollToProduct(productId);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToProduct = (productId: number) => {
    const element = productRefs.current[productId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight effect
      element.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 2000);
    }
  };

  const filterProducts = () => {
    let filtered = [...initialProducts];

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply price range filter
    filtered = filtered.filter(p => 
      p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "stock":
        filtered.sort((a, b) => b.stock - a.stock);
        break;
    }

    setProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [sortOrder, searchQuery, selectedCategory, priceRange]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : index < rating
            ? 'text-yellow-400 fill-yellow-400 opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Our Products</h1>
          
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOrder("price-asc")}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("price-desc")}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("rating")}>
                  Highest Rated
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("stock")}>
                  Stock Available
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="number"
            placeholder="Min Price"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
            className="w-24"
          />
          <span>to</span>
          <Input
            type="number"
            placeholder="Max Price"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
            className="w-24"
          />
        </div>
      </div>

      {/* productsgrid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            ref={(el) => {
              if (el) {
                productRefs.current[product.id] = el;
              }
            }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 right-2">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-500">
                    ({product.rating})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="secondary">
                    {product.stock} in stock
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* noresults  */}
      {products.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
