"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Trophy, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      setIsAuthenticated(auth === "true")
    }
    checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img src="/cerrillos-logo.png" alt="ADICE Cerrillos" className="w-16 h-16 object-contain" />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-700">ADICE</h2>
                    <p className="text-sm text-green-700">Cerrillos para siempre</p>
                  </div>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Portal de <span className="text-blue-700">Actividades</span>
                  <br />
                  <span className="text-green-700">Cerrillos</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Descubre, participa y mantente informado sobre todas las actividades, eventos y talleres de nuestra
                  comunidad. Tu centro de información actualizado.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-lg shadow-lg">
                      Ver Actividades
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-lg shadow-lg">
                    Inicia Sesión para Comenzar
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 text-lg"
                >
                  Conoce Más
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Actividades y eventos"
                className="relative rounded-3xl shadow-xl w-full h-auto border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Qué puedes hacer aquí?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa para mantenerte informado y participar en todas las actividades de Cerrillos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ver Actividades</h3>
                <p className="text-gray-600">
                  Consulta todas las actividades programadas con fechas, horarios y requisitos
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Crear Eventos</h3>
                <p className="text-gray-600">
                  Organiza y publica tus propias actividades para que otros puedan participar
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contenido Rico</h3>
                <p className="text-gray-600">Accede a imágenes, videos, documentos y material complementario</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Información Actualizada</h3>
                <p className="text-gray-600">Mantente al día con cambios y nuevas actividades de la comunidad</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de Cerrillos y mantente al día con todas las actividades disponibles
          </p>
          {!isAuthenticated && (
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg"
            >
              Iniciar Sesión Ahora
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}
