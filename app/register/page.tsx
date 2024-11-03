'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook, FaApple } from 'react-icons/fa'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to register the user
    console.log('Register attempt with:', name, email, password)
  }

  const handleOAuthRegister = (provider: string) => {
    // Here you would implement OAuth registration logic
    console.log(`Attempting to register with ${provider}`)
  }

  return (
    <div className="container mx-auto px-4 h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleOAuthRegister('Google')}>
              <FcGoogle className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleOAuthRegister('Facebook')}>
              <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
              Sign up with Facebook
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleOAuthRegister('Apple')}>
              <FaApple className="mr-2 h-4 w-4" />
              Sign up with Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}