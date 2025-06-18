"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, ImageIcon, Plus, X, Save } from "lucide-react"

export function CreateActivityForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "",
    image: "",
    video: "",
  })

  const [requirements, setRequirements] = useState<string[]>([])
  const [currentRequirement, setCurrentRequirement] = useState("")
  const [documents, setDocuments] = useState<{ name: string; type: string }[]>([])
  const [currentDocument, setCurrentDocument] = useState({ name: "", type: "pdf" })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setRequirements((prev) => [...prev, currentRequirement.trim()])
      setCurrentRequirement("")
    }
  }

  const removeRequirement = (index: number) => {
    setRequirements((prev) => prev.filter((_, i) => i !== index))
  }

  const addDocument = () => {
    if (currentDocument.name.trim()) {
      setDocuments((prev) => [...prev, { ...currentDocument, name: currentDocument.name.trim() }])
      setCurrentDocument({ name: "", type: "pdf" })
    }
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newActivity = {
      id: Date.now(),
      ...formData,
      requirements,
      documents: documents.map((doc) => ({ ...doc, url: "#" })),
    }

    const existingActivities = JSON.parse(localStorage.getItem("userActivities") || "[]")
    localStorage.setItem("userActivities", JSON.stringify([...existingActivities, newActivity]))

    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  if (success) {
    return (
      <Card className="border-2 border-green-200 shadow-xl bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">¡Actividad Creada!</h2>
          <p className="text-green-600 mb-4">Tu actividad ha sido publicada exitosamente</p>
          <div className="animate-pulse text-sm text-green-600">Redirigiendo al dashboard...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-200 shadow-xl bg-white">
      <CardHeader className="bg-blue-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl flex items-center">
          <Plus className="mr-2 h-6 w-6" />
          Nueva Actividad
        </CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-700" />
              Información Básica
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la Actividad *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Ej: Taller de Programación Web"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Actividad *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger className="focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conference">Conferencia</SelectItem>
                    <SelectItem value="workshop">Taller</SelectItem>
                    <SelectItem value="seminar">Seminario</SelectItem>
                    <SelectItem value="course">Curso</SelectItem>
                    <SelectItem value="meeting">Reunión</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe de qué trata la actividad, qué se aprenderá, etc."
                rows={4}
                required
                className="focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-green-700" />
              Fecha y Ubicación
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                  className="focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                  className="focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Ej: Aula 101, Edificio A"
                  required
                  className="focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Requisitos</h3>

            <div className="flex gap-2">
              <Input
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                placeholder="Agregar requisito"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addRequirement())}
                className="focus:ring-blue-500 focus:border-blue-500"
              />
              <Button type="button" onClick={addRequirement} variant="outline" className="border-blue-300">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {requirements.map((req, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800">
                  {req}
                  <button type="button" onClick={() => removeRequirement(index)} className="ml-2 hover:text-red-600">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <ImageIcon className="mr-2 h-5 w-5 text-green-700" />
              Contenido Multimedia
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="image">URL de Imagen</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">URL de Video (YouTube, Vimeo, etc.)</Label>
                <Input
                  id="video"
                  value={formData.video}
                  onChange={(e) => handleInputChange("video", e.target.value)}
                  placeholder="https://youtube.com/embed/..."
                  className="focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Documentos</h3>

            <div className="flex gap-2">
              <Input
                value={currentDocument.name}
                onChange={(e) => setCurrentDocument((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre del documento"
                className="focus:ring-blue-500 focus:border-blue-500"
              />
              <Select
                value={currentDocument.type}
                onValueChange={(value) => setCurrentDocument((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="doc">DOC</SelectItem>
                  <SelectItem value="ppt">PPT</SelectItem>
                  <SelectItem value="xls">XLS</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addDocument} variant="outline" className="border-blue-300">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-700" />
                    <span className="font-medium">{doc.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {doc.type.toUpperCase()}
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creando Actividad...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  Crear Actividad
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
