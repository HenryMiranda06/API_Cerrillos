"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, FileText, Video, ImageIcon, ChevronRight } from "lucide-react"

interface Activity {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  requirements: string[]
  type: string
  image?: string
  video?: string
  documents?: { name: string; url: string; type: string }[]
}

interface ActivityCardProps {
  activity: Activity
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "conference":
        return "bg-blue-700 text-white"
      case "workshop":
        return "bg-green-700 text-white"
      case "seminar":
        return "bg-blue-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "conference":
        return "Conferencia"
      case "workshop":
        return "Taller"
      case "seminar":
        return "Seminario"
      default:
        return "Evento"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-200 shadow-lg bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge className={getTypeColor(activity.type)}>{getTypeLabel(activity.type)}</Badge>
        </div>
        <CardTitle className="text-lg leading-tight text-gray-900">{activity.title}</CardTitle>
        <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-2 h-4 w-4 text-blue-700" />
          {formatDate(activity.date)}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Clock className="mr-2 h-4 w-4 text-green-700" />
          {activity.time}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="mr-2 h-4 w-4 text-blue-600" />
          {activity.location}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white">
              Ver Detalles
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-gray-900">{activity.title}</DialogTitle>
              <DialogDescription className="text-base">{activity.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-700" />
                  <div>
                    <p className="font-medium">Fecha</p>
                    <p className="text-sm text-gray-600">{formatDate(activity.date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-700" />
                  <div>
                    <p className="font-medium">Hora</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-gray-600">{activity.location}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {activity.image && (
                <div>
                  <div className="flex items-center mb-3">
                    <ImageIcon className="h-5 w-5 text-blue-700 mr-2" />
                    <h3 className="font-semibold">Imagen del Evento</h3>
                  </div>
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                </div>
              )}

              {activity.video && (
                <div>
                  <div className="flex items-center mb-3">
                    <Video className="h-5 w-5 text-green-700 mr-2" />
                    <h3 className="font-semibold">Video Informativo</h3>
                  </div>
                  <div className="aspect-video">
                    <iframe
                      src={activity.video}
                      className="w-full h-full rounded-lg border-2 border-gray-200"
                      allowFullScreen
                      title={`Video de ${activity.title}`}
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-3">Requisitos</h3>
                <ul className="space-y-2">
                  {activity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-700 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activity.documents && activity.documents.length > 0 && (
                <div>
                  <div className="flex items-center mb-3">
                    <FileText className="h-5 w-5 text-green-700 mr-2" />
                    <h3 className="font-semibold">Documentos</h3>
                  </div>
                  <div className="grid gap-2">
                    {activity.documents.map((doc, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start h-auto p-3 border-2 border-gray-200 hover:border-blue-300"
                        onClick={() => window.open(doc.url, "_blank")}
                      >
                        <FileText className="h-4 w-4 mr-2 text-blue-700" />
                        <div className="text-left">
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-gray-500 uppercase">{doc.type}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
