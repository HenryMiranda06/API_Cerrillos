// Estado de autenticación
let isAuthenticated = false
let currentUser = null

// Datos de ejemplo para eventos (en producción vendrían de la API de .NET)
const eventos = [
  {
    id: 1,
    titulo: "Bingo Benéfico",
    descripcion:
      "Gran bingo para recaudar fondos para materiales didácticos. Premios increíbles y diversión garantizada.",
    fecha: "2024-12-15",
    hora: "19:00",
    lugar: "Salón Comunal de Cerrillos",
    transporte: true,
    imagen: "/placeholder.svg?height=200&width=300",
    estado: "activo",
  },
  {
    id: 2,
    titulo: "Baile Navideño",
    descripcion: "Celebra la Navidad con nosotros en un baile familiar. Música en vivo y comida típica.",
    fecha: "2024-12-22",
    hora: "20:00",
    lugar: "Patio de la Escuela",
    transporte: false,
    imagen: "/placeholder.svg?height=200&width=300",
    estado: "activo",
  },
]

// Función de login
function login() {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const errorDiv = document.getElementById("loginError")

  // Validación simple (en producción se haría contra la API de .NET)
  if (username === "admin" && password === "admin123") {
    isAuthenticated = true
    currentUser = { username: "admin", role: "administrator" }

    // Guardar en localStorage para persistencia
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    // Actualizar UI
    updateAuthUI()

    // Cerrar modal
    const modal = window.bootstrap.Modal.getInstance(document.getElementById("loginModal"))
    modal.hide()

    // Limpiar formulario
    document.getElementById("loginForm").reset()
    errorDiv.classList.add("d-none")

    // Mostrar mensaje de éxito
    showAlert("Sesión iniciada correctamente", "success")
  } else {
    errorDiv.textContent = "Usuario o contraseña incorrectos"
    errorDiv.classList.remove("d-none")
  }
}

// Función de logout
function logout() {
  isAuthenticated = false
  currentUser = null

  // Limpiar localStorage
  localStorage.removeItem("isAuthenticated")
  localStorage.removeItem("currentUser")

  // Actualizar UI
  updateAuthUI()

  // Mostrar mensaje
  showAlert("Sesión cerrada correctamente", "info")

  // Redirigir a inicio si está en página de admin
  if (window.location.pathname.includes("admin") || window.location.pathname.includes("crear-evento")) {
    window.location.href = "index.html"
  }
}

// Actualizar UI según estado de autenticación
function updateAuthUI() {
  const authSection = document.getElementById("authSection")
  const adminSection = document.getElementById("adminSection")

  if (isAuthenticated) {
    authSection.classList.add("d-none")
    adminSection.classList.remove("d-none")
  } else {
    authSection.classList.remove("d-none")
    adminSection.classList.add("d-none")
  }
}


// Mostrar alertas
function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(alertDiv)

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove()
    }
  }, 5000)
}

// Proteger páginas de admin
function requireAuth() {
  if (!isAuthenticated) {
    showAlert("Acceso denegado. Debe iniciar sesión como administrador.", "danger")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 2000)
    return false
  }
  return true
}

// Cargar eventos dinámicamente
function loadEventos() {
  const container = document.getElementById("eventosContainer")
  if (!container) return

  // En producción, esto sería una llamada a la API de .NET
  // fetch('/api/eventos')
  //     .then(response => response.json())
  //     .then(data => renderEventos(data));

  renderEventos(eventos)
}

// Renderizar eventos
function renderEventos(eventosData) {
  const container = document.getElementById("eventosContainer")
  if (!container) return

  container.innerHTML = ""

  eventosData.forEach((evento) => {
    const eventoCard = createEventoCard(evento)
    container.appendChild(eventoCard)
  })
}

// Crear card de evento
function createEventoCard(evento) {
  const col = document.createElement("div")
  col.className = "col-md-6 col-lg-4 mb-4"

  const fechaFormateada = new Date(evento.fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${evento.imagen}" class="card-img-top" alt="${evento.titulo}">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-success">Próximo</span>
                    <small class="text-muted">${fechaFormateada}</small>
                </div>
                <h5 class="card-title">${evento.titulo}</h5>
                <p class="card-text">${evento.descripcion}</p>
                <div class="mb-3">
                    <small class="text-muted">
                        <i class="fas fa-map-marker-alt me-1"></i>${evento.lugar}<br>
                        <i class="fas fa-clock me-1"></i>${evento.hora}<br>
                        <i class="fas fa-${evento.transporte ? "bus" : "times"} me-1 text-${evento.transporte ? "success" : "danger"}"></i>
                        ${evento.transporte ? "Transporte disponible" : "Sin transporte"}
                    </small>
                </div>
            </div>
            <div class="card-footer bg-transparent">
                <button class="btn btn-primary w-100" onclick="verDetalleEvento(${evento.id})">Ver Detalles</button>
            </div>
        </div>
    `

  return col
}

// Ver detalle de evento
function verDetalleEvento(eventoId) {
  const evento = eventos.find((e) => e.id === eventoId)
  if (evento) {
    // Aquí podrías abrir un modal con más detalles o redirigir a una página de detalle
    showAlert(`Mostrando detalles de: ${evento.titulo}`, "info")
  }
}

// Manejar envío de formulario de login con Enter
document.addEventListener("DOMContentLoaded", () => {
  checkAuth()
  loadEventos()

  // Event listener para el formulario de login
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        login()
      }
    })
  }

  // Smooth scrolling para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Funciones para integración con .NET
const API_BASE_URL = "/api" // Ajustar según tu configuración de .NET

// Función para hacer peticiones a la API de .NET
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  // Agregar token de autenticación si existe
  const token = localStorage.getItem("authToken")
  if (token) {
    defaultOptions.headers["Authorization"] = `Bearer ${token}`
  }

  const finalOptions = { ...defaultOptions, ...options }

  try {
    const response = await fetch(url, finalOptions)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// Funciones específicas para la API
const API = {
  // Autenticación
  login: async (credentials) => {
    return await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  // Eventos
  getEventos: async () => {
    return await apiRequest("/eventos")
  },

  createEvento: async (evento) => {
    return await apiRequest("/eventos", {
      method: "POST",
      body: JSON.stringify(evento),
    })
  },

  updateEvento: async (id, evento) => {
    return await apiRequest(`/eventos/${id}`, {
      method: "PUT",
      body: JSON.stringify(evento),
    })
  },

  deleteEvento: async (id) => {
    return await apiRequest(`/eventos/${id}`, {
      method: "DELETE",
    })
  },

  // Noticias
  getNoticias: async () => {
    return await apiRequest("/noticias")
  },

  createNoticia: async (noticia) => {
    return await apiRequest("/noticias", {
      method: "POST",
      body: JSON.stringify(noticia),
    })
  },
}

// Importación de Bootstrap
window.bootstrap = window.bootstrap || {}
window.bootstrap.Modal = window.bootstrap.Modal || {
  getInstance: (element) => {
    // Implementación simple para evitar errores de undeclared variable
    return {
      hide: () => {
        element.style.display = "none"
      },
    }
  },
}
