import {pool} from './database.js';

class LibroController{
  // Método getAll: Obtiene todos los registros de libros y enviarlos como objetos JSON.
  async getAll(req, res) {
    // Ejecutar una consulta SQL para seleccionar campos específicos de la tabla de libros.
      const [result] = await pool.query('SELECT id, nombre, autor, categoria, DATE_FORMAT(`año-publicacion`, "%d-%m-%Y") AS año_publicacion, ISBN FROM libros');
    
      // Mapear los resultados para formatearlos como objetos JSON y unirlos.
      const formattedResults = result.map(row => {
        return {
          id: row.id,
          nombre: row.nombre,
          autor: row.autor,
          categoria: row.categoria,
          año_publicacion: row.año_publicacion,
          ISBN: row.ISBN,
        };
      });
    
      // Enviar la respuesta como texto plano con objetos JSON separados por una línea en blanco.
      res.type('text');
      formattedResults.forEach(item => {
        res.write(JSON.stringify(item) + '\n');
      });
    
      res.end(); // Finalizar la respuesta.
  }   
   

  // Método getOne: Recupera un libro específico de la base de datos utilizando el ID proporcionado en los parámetros.  
  async getOne(req, res) {
      const libroId = req.params.id; // Recupera el ID del libro del parámetro de la URL.
      // Realiza una consulta SQL para seleccionar el nombre, autor, categoría, año de publicación y ISBN del libro con el ID proporcionado.
      const [result] = await pool.query('SELECT nombre, autor, categoria, DATE_FORMAT(`año-publicacion`, "%d-%m-%Y") AS año_publicacion, ISBN FROM libros WHERE id = ?', [libroId]);
      if (result.length === 0) { // Verifica si se encontró algún libro con el ID especificado en la base de datos.
        res.json({ error: 'Libro no encontrado' }); // Si no se encontró ningún libro, responde con un objeto JSON de error indicando que el libro no se encontró.
      } else {
        res.json(result);// Si se encontró un libro, responde con los detalles del libro formateados como un objeto JSON.
      }
  }
}

export const libro = new LibroController();
