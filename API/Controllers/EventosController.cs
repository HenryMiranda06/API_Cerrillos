using Microsoft.AspNetCore.Mvc;
using API_Cerrillos.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API_Cerrillos.Controllers
{
    [Route("api/Eventos")]
    [ApiController]
    public class EventosController : Controller
    {
        private readonly DBContext _context;

        public EventosController(DBContext context)
        {
            _context = context;
        }

        // Método de mapeo de Eventos (DB Model) a EventoGetDTO (Output DTO)
        private EventoGetDTO MapEventoToDTO(Eventos evento)
        {
            if (evento == null) return null;

            return new EventoGetDTO
            {
                ID_Evento = evento.ID_Evento,
                TituloEvento = evento.TituloEvento,
                Descripcion = evento.Descripcion,
                FechaEvento = evento.FechaEvento,
                HoraInicio = evento.HoraInicio,
                Lugar = evento.Lugar,
                ImagenBase64 = evento.Imagen != null ? Convert.ToBase64String(evento.Imagen) : null,
                InfoContacto = evento.InfoContacto,
                Notas = evento.Notas,
                Estado = evento.Estado,
                Transporte = evento.Transporte,
                Correo = evento.Correo, // Mapeamos el string simple Correo
               
                
            };
        }


        // --- Método GET para obtener TODOS los eventos ---
        [HttpGet("ListadoEventos")]
        public async Task<IActionResult> GetEventos()
        {
            try
            {
                var eventos = await _context.Eventos.Include(e => e.CategoriaEventos).ThenInclude(ce => ce.Categoria)
               .ToListAsync();

                if (eventos == null || !eventos.Any())
                {
                    return NotFound("No se encontraron eventos.");
                }

                var eventosDto = eventos.Select(e => MapEventoToDTO(e)).ToList();
                return Ok(eventosDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor al obtener eventos: {ex.Message}");
            }
        }

        // --- Método GET para obtener UN evento por ID ---
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvento(int id)
        {
            try
            {
                var evento = await _context.Eventos.Include(e => e.CategoriaEventos).ThenInclude(ce => ce.Categoria)
               .FirstOrDefaultAsync(e => e.ID_Evento == id);

                if (evento == null)
                {
                    return NotFound($"No se encontró ningún evento con el ID: {id}.");
                }

                var eventoDto = MapEventoToDTO(evento);
                return Ok(eventoDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor al obtener evento por ID: {ex.Message}");
            }
        }

        // --- Método POST para CREAR un nuevo Evento ---
        [HttpPost]
        public async Task<IActionResult> PostEvento([FromBody] EventoPostDTO eventoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                
                // Validar que el ID de Categoría proporcionado exista
                var categoriaExiste = await _context.Categorias.AnyAsync(c => c.ID_Categoria == eventoDto.ID_Categoria);
                if (!categoriaExiste)
                {
                    return BadRequest($"La Categoría con ID {eventoDto.ID_Categoria} no existe. Por favor, proporcione un ID de Categoría válido.");
                }

                // Mapeo del DTO de entrada al Modelo de Entidad Principal (Eventos)
                var nuevoEvento = new Eventos
                {
                    TituloEvento = eventoDto.TituloEvento,
                    Descripcion = eventoDto.Descripcion,
                    FechaEvento = eventoDto.FechaEvento,
                    HoraInicio = eventoDto.HoraInicio,
                    Lugar = eventoDto.Lugar,
                    Imagen = string.IsNullOrEmpty(eventoDto.ImagenBase64) ? null : Convert.FromBase64String(eventoDto.ImagenBase64),
                    InfoContacto = eventoDto.InfoContacto,
                    Notas = eventoDto.Notas,
                    Estado = eventoDto.Estado,
                    Transporte = eventoDto.Transporte,
                    Correo = eventoDto.Correo 
                };

                _context.Eventos.Add(nuevoEvento);

                // Crear UNA SOLA Entrada en la Tabla de Unión (CategoriaEvento)
                nuevoEvento.CategoriaEventos.Add(new CategoriaEvento
                {
                    ID_Categoria = eventoDto.ID_Categoria
                });

                await _context.SaveChangesAsync();

                // Recargar el evento para poblar las propiedades de navegación para el DTO de salida
                var eventoCreado = await _context.Eventos.Include(e => e.CategoriaEventos).ThenInclude(ce => ce.Categoria)
                .FirstOrDefaultAsync(e => e.ID_Evento == nuevoEvento.ID_Evento);

                var eventoCreadoDto = MapEventoToDTO(eventoCreado);

                return CreatedAtAction(nameof(GetEvento), new { id = eventoCreadoDto.ID_Evento }, eventoCreadoDto);
            }
            catch (FormatException)
            {
                return BadRequest("El formato de la imagen en base64 no es válido.");
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, $"Error al guardar en la base de datos: {dbEx.InnerException?.Message ?? dbEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
    }
}