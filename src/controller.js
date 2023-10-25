import {pool} from './database.js';

class LibroController{
  // Método getAll: Obtiene todos los registros de libros y enviarlos como objetos JSON.
  async getAll(req, res) {
    try {
      // Ejecutar una consulta SQL para seleccionar campos específicos de la tabla de libros.
      const [result] = await pool.query('SELECT id, nombre, autor, categoria, DATE_FORMAT(`año-publicacion`, "%d-%m-%Y") AS año_publicacion, ISBN FROM libros');
  
      // Enviar la respuesta como JSON usando el método "json" de "response".
      res.json(result);
    } catch (error) {
      // Manejar errores en caso de que la consulta falle.
      console.error('Error en la consulta SQL:', error);
      res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
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
