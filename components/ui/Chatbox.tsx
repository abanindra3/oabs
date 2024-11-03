"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink, ShoppingCart, Tag } from "lucide-react";
import Link from 'next/link';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
  products?: Product[];
  deals?: Deal[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
}

interface Deal {
  id: number;
  name: string;
  discount: string;
  description: string;
  validUntil?: string;
}

const initialProducts = [
  { 
    id: 1, 
    name: "Wireless Earbuds", 
    price: 79.99, 
    description: "High-quality sound with long battery life", 
    image: "/images/earbuds.webp",
    badge: "Best Seller",
    keywords: ["earbuds", "headphones", "audio", "wireless", "sound", "music", "earphones"]
  },
  { 
    id: 2, 
    name: "Smart Watch", 
    price: 199.99, 
    description: "Track your fitness and stay connected", 
    image: "/images/smartwatch.webp",
    badge: "New",
    keywords: ["watch", "smartwatch", "wearable", "fitness", "smart", "tracker", "digital"]
  },
  { 
    id: 3, 
    name: "Analogue Watch", 
    price: 799.99, 
    description: "Track your fitness and stay connected", 
    image: "/images/analogwatch.webp",
    badge: "New",
    keywords: ["watch", "smartwatch", "wearable", "fitness", "smart", "tracker", "digital"]
  },
  { 
    id: 4, 
    name: "Portable Charger", 
    price: 49.99, 
    description: "Keep your devices powered on the go", 
    image: "/images/charger.webp",
    badge: "Popular",
    keywords: ["charger", "power bank", "portable", "battery", "power", "charging"]
  },
];

const initialDeals = [
  { 
    id: 1, 
    name: 'Summer Sale', 
    discount: '20% off', 
    description: 'Get 20% off on all summer essentials',
    validUntil: '2024-08-31',
    keywords: ["summer", "sale", "discount", "seasonal", "hot", "deals"]
  },
  { 
    id: 2, 
    name: 'Bundle and Save', 
    discount: 'Buy 2, Get 1 Free', 
    description: 'On selected electronics',
    validUntil: '2024-12-31',
    keywords: ["bundle", "electronics", "offer", "free", "savings"]
  },
  { 
    id: 3, 
    name: 'Flash Sale', 
    discount: 'Up to 50% off', 
    description: 'Limited time offer on top brands',
    validUntil: '2024-07-15',
    keywords: ["flash", "sale", "limited", "discount", "offer", "deals"]
  },
];

const welcomeMessage = {
  text: "👋 Hi! I'm your AI shopping assistant. I can help you find products, compare prices, and discover great deals. What are you looking for today?",
  isUser: false,
  timestamp: new Date(),
};

// idhar jitne related ho, sab daal do
const searchMappings = {
  "watch": ["watch", "smartwatch", "wearable"],
  "headphone": ["earbuds", "headphones", "earphones"],
  "power": ["charger", "battery", "power bank"],
  "deal": ["sale", "discount", "offer"],
  "audio": ["earbuds", "headphones", "sound", "music"],
};

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    setIsTyping(false);
  };

  // ye part normal convo aise padhta hai else was only working with jo keywords the
  const findRelevantProducts = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ');
    const productMatches = new Set<Product>();

    searchTerms.forEach(term => {
      // removing the common words and punctuation
      const cleanTerm = term.replace(/[.,!?]/g, '').trim();
      if (cleanTerm.length < 2 || ['show', 'me', 'a', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'].includes(cleanTerm)) {
        return;
      }

      // idhar it searches for mapped search terms
      const mappedTerms = Object.entries(searchMappings).find(([key]) => 
        cleanTerm.includes(key) || key.includes(cleanTerm)
      )?.[1] || [];

      initialProducts.forEach(product => {
        const searchableText = [
          product.name.toLowerCase(),
          product.description.toLowerCase(),
          ...(product.keywords || []),
          ...mappedTerms
        ].join(' ');

        if (
          searchableText.includes(cleanTerm) ||
          cleanTerm.includes(product.name.toLowerCase()) ||
          (product.keywords && product.keywords.some(keyword => 
            keyword.includes(cleanTerm) || cleanTerm.includes(keyword)
          ))
        ) {
          productMatches.add(product);
        }
      });
    });

    return Array.from(productMatches);
  };

  // wahi sab for deals
  const findRelevantDeals = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ');
    const dealMatches = new Set<Deal>();

    searchTerms.forEach(term => {
      const cleanTerm = term.replace(/[.,!?]/g, '').trim();
      if (cleanTerm.length < 2 || ['show', 'me', 'a', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'].includes(cleanTerm)) {
        return;
      }

      initialDeals.forEach(deal => {
        const searchableText = [
          deal.name.toLowerCase(),
          deal.description.toLowerCase(),
          ...(deal.keywords || [])
        ].join(' ');

        if (
          searchableText.includes(cleanTerm) ||
          cleanTerm.includes('deal') ||
          cleanTerm.includes('sale') ||
          cleanTerm.includes('discount')
        ) {
          dealMatches.add(deal);
        }
      });
    });

    return Array.from(dealMatches);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await simulateTyping();
 
      const relevantProducts = findRelevantProducts(input);
      const relevantDeals = findRelevantDeals(input);

      const aiMessage: Message = {
        text: generateResponse(input, relevantProducts, relevantDeals),
        isUser: false,
        timestamp: new Date(),
        products: relevantProducts,
        deals: relevantDeals,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (input: string, products: Product[], deals: Deal[]) => {
    const searchTerms = input.toLowerCase();
    
    if (searchTerms.includes('deal') || searchTerms.includes('sale') || searchTerms.includes('discount')) {
      return deals.length > 0
        ? `I found some great deals that might interest you! Check these out:`
        : `I don't see any current deals matching your search, but let me show you our available products instead.`;
    }

    if (products.length > 0) {
      return `I found ${products.length} ${products.length === 1 ? 'item' : 'items'} that might interest you! ${
        products.length === 1 
          ? `The ${products[0].name} would be perfect for you.` 
          : `Here are some items that match what you're looking for.`
      } Let me know if you'd like more details about any of them.`;
    }

    return "I couldn't find exact matches for your search, but I'd be happy to help you explore other options. Could you tell me more about what specific features or type of product you're looking for?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderProductCard = (product: Product) => (
    <Link href={`/products#product-${product.id}`} key={product.id}>
      <Card className="mb-2 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors text-black">
              {product.name}
            </CardTitle>
            {product.badge && (
              <Badge variant="secondary" className="ml-2">
                {product.badge}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-bold text-black">${product.price.toFixed(2)}</p>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  const renderDealCard = (deal: Deal) => (
    <Card key={deal.id} className="mb-2 bg-gradient-to-r from-primary/10 to-primary/5">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{deal.name}</CardTitle>
          <Tag className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm font-bold text-primary">{deal.discount}</p>
        <p className="text-sm text-gray-600">{deal.description}</p>
        {deal.validUntil && (
          <p className="text-xs text-gray-500 mt-2">
            Valid until {new Date(deal.validUntil).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
          AI Shopping Assistant
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <div className="whitespace-pre-wrap text-black">{msg.text}</div>
              {msg.products && msg.products.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">
                    {msg.products.length === 1 ? 'Recommended Product:' : 'Recommended Products:'}
                  </h3>
                  <div className="space-y-2">
                    {msg.products.map(product => renderProductCard(product))}
                  </div>
                </div>
              )}
              {msg.deals && msg.deals.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Available Deals:</h3>
                  <div className="space-y-2">
                    {msg.deals.map(deal => renderDealCard(deal))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
         <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about products or deals..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Send'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
