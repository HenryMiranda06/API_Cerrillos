"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ActivityCard } from "@/components/activity-card"
import { Skeleton } from "@/components/ui/skeleton"

const mockActivities = [
  {
    id: 1,
    title: "Conferencia de Tecnología 2024",
    description: "Una conferencia sobre las últimas tendencias en tecnología y desarrollo de software.",
    date: "2024-02-15",
    time: "09:00 AM",
    location: "Centro de Convenciones",
    requirements: ["Registro previo", "Identificación oficial", "Laptop personal (opcional)"],
    type: "conference",
    image: "/placeholder.svg?height=200&width=400",
    documents: [
      { name: "Programa del evento", url: "#", type: "pdf" },
      { name: "Lista de ponentes", url: "#", type: "pdf" },
    ],
  },
  {
    id: 2,
    title: "Taller de Diseño UX/UI",
    description: "Aprende los fundamentos del diseño de experiencia de usuario y interfaces.",
    date: "2024-02-20",
    time: "02:00 PM",
    location: "Aula 301, Edificio Principal",
    requirements: ["Conocimientos básicos de diseño", "Software de diseño instalado", "Cuaderno y lápiz"],
    type: "workshop",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    documents: [
      { name: "Material del taller", url: "#", type: "pdf" },
      { name: "Recursos adicionales", url: "#", type: "pdf" },
    ],
  },
  {
    id: 3,
    title: "Seminario de Marketing Digital",
    description: "Estrategias efectivas para el marketing en redes sociales y plataformas digitales.",
    date: "2024-02-25",
    time: "10:00 AM",
    location: "Auditorio Principal",
    requirements: ["Experiencia en marketing (deseable)", "Dispositivo móvil", "Acceso a redes sociales"],
    type: "seminar",
    image: "/placeholder.svg?height=200&width=400",
    documents: [
      { name: "Guía de marketing digital", url: "#", type: "pdf" },
      { name: "Plantillas de contenido", url: "#", type: "pdf" },
      { name: "Casos de estudio", url: "#", type: "pdf" },
    ],
  },
]

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState(mockActivities)
  const router = useRouter()

  useEffect(() => {
    const userActivities = JSON.parse(localStorage.getItem("userActivities") || "[]")
    setActivities((prev) => [...prev, ...userActivities])
  }, [])

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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Actividades <span className="text-blue-700">Programadas</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Consulta la información de las próximas actividades y eventos de Cerrillos
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {activities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay actividades programadas en este momento</p>
          </div>
        )}
      </main>
    </div>
  )
}
