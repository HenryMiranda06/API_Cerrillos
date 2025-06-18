"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { CreateActivityForm } from "@/components/create-activity-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function CreateActivityPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      if (auth === "true") {
        setIsAuthenticated(true)
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
          <Skeleton className="h-96 w-full max-w-2xl mx-auto" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Crear Nueva <span className="text-blue-700">Actividad</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Comparte información sobre tu actividad, evento o taller en Cerrillos
            </p>
          </div>
          <CreateActivityForm />
        </div>
      </main>
    </div>
  )
}
