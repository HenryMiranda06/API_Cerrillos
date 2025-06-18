"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { UserManagement } from "@/components/user-management"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ShieldX } from "lucide-react"

export default function AdminUsersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      const email = localStorage.getItem("userEmail")

      if (auth === "true") {
        setIsAuthenticated(true)
        if (email === "admin@portal.com") {
          setIsAdmin(true)
        }
      } else {
        router.push("/")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 bg-white border-b">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Alert variant="destructive">
              <ShieldX className="h-4 w-4" />
              <AlertDescription className="text-center">
                <strong>Acceso Denegado</strong>
                <br />
                No tienes permisos para acceder a esta página.
              </AlertDescription>
            </Alert>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Administración de <span className="text-blue-700">Usuarios</span>
          </h1>
          <p className="text-gray-600 text-lg">Gestiona usuarios y asigna roles en el sistema de Cerrillos</p>
        </div>
        <UserManagement />
      </main>
    </div>
  )
}
