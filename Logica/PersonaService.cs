using Datos;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Logica
{
    public class PersonaService
    {
        private readonly PersonasContext _context;
        public PersonaService(PersonasContext context)
        {
           _context = context;
        }
        public GuardarPersonaResponse Guardar(Persona persona)
        {
            try
            {
                
                var personaAux = _context.Personas.Find(persona.Identificacion);
                if (personaAux != null)
                {
                    return new GuardarPersonaResponse($"Error de la Aplicacion: La persona ya se encuentra registrada!");
                }        
              
                _context.Personas.Add(persona);
                _context.SaveChanges();
                return new GuardarPersonaResponse(persona);
            }
            catch (Exception e)
            {
                return new GuardarPersonaResponse($"Error de la Aplicacion: {e.Message}");
            }
        }
        public List<Persona> ConsultarTodos()
        {
            
            List<Persona> personas = _context.Personas.ToList();
            return personas;
        }
        public Persona BuscarxIdentificacion(string identificacion)
        {
            
            Persona persona = _context.Personas.Find(identificacion);
            return persona;
        }
    }

    public class GuardarPersonaResponse 
    {
        public GuardarPersonaResponse(Persona persona)
        {
            Error = false;
            Persona = persona;
        }
        public GuardarPersonaResponse(string mensaje)
        {
            Error = true;
            Mensaje = mensaje;
        }
        public bool Error { get; set; }
        public string Mensaje { get; set; }
        public Persona Persona { get; set; }
        
    }
}