// app/deals.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const deals = [
  { id: 1, name: 'Summer Sale', discount: '20% off', description: 'Get 20% off on all summer essentials' },
  { id: 2, name: 'Bundle and Save', discount: 'Buy 2, Get 1 Free', description: 'On selected electronics' },
  { id: 3, name: 'Flash Sale', discount: 'Up to 50% off', description: 'Limited time offer on top brands' },
  // More deals can be added here
]

export default function DealsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Current Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Card key={deal.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{deal.name}</CardTitle>
              <CardDescription className="text-primary font-bold">{deal.discount}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{deal.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Shop Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
