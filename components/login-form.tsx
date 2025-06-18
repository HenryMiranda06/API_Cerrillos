"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ResetPasswordForm } from "@/components/reset-password-form"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "admin@portal.com" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userRole", "admin")
      localStorage.setItem("userName", "Administrador Principal")

      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/dashboard")
      }
    } else {
      const credentials = JSON.parse(localStorage.getItem("userCredentials") || "{}")
      const userCredential = credentials[email]

      if (userCredential && userCredential.password === password) {
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userRole", userCredential.role)
        localStorage.setItem("userName", userCredential.name)

        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/dashboard")
        }
      } else {
        setError("Credenciales incorrectas. Admin: admin@portal.com / admin123")
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
          <strong>Credenciales de prueba:</strong>
          <br />
          Email: admin@portal.com
          <br />
          Contraseña: admin123
        </div>

        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Iniciando sesión...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </>
          )}
        </Button>

        <div className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sm text-blue-700 hover:text-blue-800">
                ¿Olvidaste tu contraseña?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold text-blue-700">
                  Restablecer Contraseña
                </DialogTitle>
              </DialogHeader>
              <ResetPasswordForm />
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  )
}
