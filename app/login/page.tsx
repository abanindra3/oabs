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

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to authenticate the user
    console.log('Login attempt with:', email, password)
  }

  const handleOAuthLogin = (provider: string) => {
    // Here you would implement OAuth login logic
    console.log(`Attempting to login with ${provider}`)
  }

  return (
    <div className="container mx-auto px-4 h-[calc(100vh-4rem)] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin('Google')}>
              <FcGoogle className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin('Facebook')}>
              <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
              Sign in with Facebook
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleOAuthLogin('Apple')}>
              <FaApple className="mr-2 h-4 w-4" />
              Sign in with Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}