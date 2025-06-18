"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, UserPlus, Edit, Trash2, Shield, Eye } from "lucide-react"

interface SystemUser {
  id: string
  email: string
  name: string
  role: "admin" | "moderator" | "user"
  createdAt: string
  status: "active" | "inactive"
}

export function UserManagement() {
  const [users, setUsers] = useState<SystemUser[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    role: "user" as "admin" | "moderator" | "user",
    password: "",
  })

  useEffect(() => {
    const savedUsers = localStorage.getItem("systemUsers")
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      const defaultUsers: SystemUser[] = [
        {
          id: "1",
          email: "admin@portal.com",
          name: "Administrador Principal",
          role: "admin",
          createdAt: "2024-01-01",
          status: "active",
        },
      ]
      setUsers(defaultUsers)
      localStorage.setItem("systemUsers", JSON.stringify(defaultUsers))
    }
  }, [])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (users.some((user) => user.email === newUser.email)) {
      setError("Ya existe un usuario con este email")
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: SystemUser = {
      id: Date.now().toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    }

    const updatedUsers = [...users, user]
    setUsers(updatedUsers)
    localStorage.setItem("systemUsers", JSON.stringify(updatedUsers))

    const credentials = JSON.parse(localStorage.getItem("userCredentials") || "{}")
    credentials[newUser.email] = {
      password: newUser.password,
      role: newUser.role,
      name: newUser.name,
    }
    localStorage.setItem("userCredentials", JSON.stringify(credentials))

    setSuccess(`Usuario ${newUser.name} creado exitosamente`)
    setNewUser({ email: "", name: "", role: "user", password: "" })
    setIsCreateDialogOpen(false)
    setIsLoading(false)

    setTimeout(() => setSuccess(""), 3000)
  }

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
    localStorage.setItem("systemUsers", JSON.stringify(updatedUsers))
    setSuccess("Usuario eliminado exitosamente")
    setTimeout(() => setSuccess(""), 3000)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "moderator":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "user":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "moderator":
        return <Edit className="h-4 w-4" />
      case "user":
        return <Eye className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "moderator":
        return "Moderador"
      case "user":
        return "Usuario"
      default:
        return "Usuario"
    }
  }

  return (
    <div className="space-y-6">
      {/* Alertas */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header con botón crear */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Usuarios del Sistema</h2>
          <p className="text-gray-600">Gestiona los usuarios y sus permisos</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Crear Usuario
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-blue-700" />
                Crear Nuevo Usuario
              </DialogTitle>
              <DialogDescription>Completa la información para crear una nueva cuenta de usuario.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Juan Pérez"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="usuario@ejemplo.com"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña Temporal *</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Contraseña temporal"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol *</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: "admin" | "moderator" | "user") =>
                    setNewUser((prev) => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <div className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        Usuario - Solo puede ver actividades
                      </div>
                    </SelectItem>
                    <SelectItem value="moderator">
                      <div className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Moderador - Puede crear y editar actividades
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Administrador - Acceso completo
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Crear Usuario
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabla de usuarios */}
      <Card className="border-2 border-gray-200 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="mr-2 h-5 w-5 text-blue-700" />
            Lista de Usuarios ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Fecha de Creación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1">{getRoleLabel(user.role)}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString("es-ES")}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.email !== "admin@portal.com" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {users.length === 0 && <div className="text-center py-8 text-gray-500">No hay usuarios registrados</div>}
        </CardContent>
      </Card>

      {/* Información de roles */}
      <Card className="border-2 border-gray-200 shadow-lg bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Información de Roles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <Shield className="h-4 w-4 mr-1" />
              Administrador
            </Badge>
            <span className="text-sm text-gray-600">
              Acceso completo al sistema, puede gestionar usuarios y todas las funcionalidades
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              <Edit className="h-4 w-4 mr-1" />
              Moderador
            </Badge>
            <span className="text-sm text-gray-600">Puede crear, editar y gestionar actividades, pero no usuarios</span>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <Eye className="h-4 w-4 mr-1" />
              Usuario
            </Badge>
            <span className="text-sm text-gray-600">
              Solo puede ver actividades y contenido, sin permisos de edición
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
