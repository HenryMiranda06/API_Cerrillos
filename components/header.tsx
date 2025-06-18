"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LogOut, User, LogIn, Plus } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export function Header() {
  const [userEmail, setUserEmail] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      const email = localStorage.getItem("userEmail") || ""
      setIsAuthenticated(auth === "true")
      setUserEmail(email)
    }
    checkAuth()

    const handleStorageChange = () => {
      checkAuth()
    }
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    setIsAuthenticated(false)
    setUserEmail("")
    router.push("/")
  }

  const getInitials = (email: string) => {
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  const handleLoginSuccess = () => {
    setIsLoginOpen(false)
    const auth = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail") || ""
    setIsAuthenticated(auth === "true")
    setUserEmail(email)
  }

  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="/cerrillos-logo.png" alt="ADICE Cerrillos" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-lg font-bold text-blue-700">Portal ADICE</h1>
              <p className="text-xs text-green-700 -mt-1">Cerrillos</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                    Ver Actividades
                  </Button>
                </Link>

                <Link href="/create-activity">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Actividad
                  </Button>
                </Link>

                {userEmail === "admin@portal.com" && (
                  <Link href="/admin/users">
                    <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                      <User className="mr-2 h-4 w-4" />
                      Administrar Usuarios
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-700 text-white">{getInitials(userEmail)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{localStorage.getItem("userName") || "Usuario"}</span>
                        <span className="text-xs text-gray-500">{userEmail}</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    <LogIn className="mr-2 h-4 w-4" />
                    Iniciar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-blue-700">Iniciar Sesión</DialogTitle>
                  </DialogHeader>
                  <LoginForm onSuccess={handleLoginSuccess} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
