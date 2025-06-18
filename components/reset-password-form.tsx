"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, CheckCircle } from "lucide-react"

export function ResetPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (email.includes("@")) {
      setSuccess(true)
    } else {
      setError("Por favor ingresa un email válido")
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">¡Email Enviado!</h3>
          <p className="text-sm text-green-600 mb-4">
            Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{email}</strong>
          </p>
          <p className="text-xs text-gray-500">Si no recibes el email en unos minutos, revisa tu carpeta de spam.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-center text-sm text-gray-600 mb-4">
        Ingresa tu email y te enviaremos las instrucciones para restablecer tu contraseña.
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Correo Electrónico</Label>
          <Input
            id="reset-email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Enviando...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Enviar Instrucciones
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
