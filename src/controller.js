import {pool} from './database.js';
import validacionLibro from './validacion.js';

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

  //Agreda registros, como array, es decir para ingresar un (o varios) registro: [{"id":1, "nombre":"Libro"...}]
  async add(req, res) {
    const libros = req.body; 
    try {
      const insertarResultados = [];
  
      for (const libro of libros) {
        try {
          // Verificar si el libro ya existe en la base de datos por su ID
          const [existingBooks] = await pool.query('SELECT id FROM libros WHERE id = ?', [libro.id]);
  
          // Validar los campos del libro
          validacionLibro(libro);
  
          if (existingBooks.length > 0) {
            // El libro ya existe, mostrar un mensaje de error o devolver una respuesta apropiada.
            insertarResultados.push({ "error": `El libro con ID ${libro.id} ya existe en la base de datos` });
          } else {
            // El libro no existe y la validación es exitosa, proceder con la inserción.
            const [result] = await pool.query('INSERT INTO libros (id, nombre, autor, categoria, `año-publicacion`, ISBN) VALUES (?, ?, ?, ?, ?, ?)', [libro.id, libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN]);
            insertarResultados.push({ "id insertado": result.insertId });
          }
        } catch (error) {
          // Captura y maneja cualquier excepción lanzada por la validación
          insertarResultados.push({ "error": error.message });
        }
      }
  
      res.json(insertarResultados);
    } catch (error) {
      console.error("Error al insertar en la base de datos:", error);
      res.status(500).json({ error: "No se pudieron insertar los libros en la base de datos" });
    }
  }
  
  //Actualiza un libro segun el id que se le pase (solo uno por vez) - EJ {"id":1, "nombre":"Libro"...}
  async update(req, res) {
    const libro = req.body;
    const libroId = req.params.id; // Obtener el ID de la ruta
    try {

      validacionLibro(libro);

        // Verificar si el libro existe antes de actualizar
      const [existingLibro] = await pool.query('SELECT * FROM libros WHERE id = ?', [libroId]);

      if (existingLibro.length === 0) {
        // Si no se encontró el libro, responde con un código 404 (No encontrado)
        res.status(404).json({ error: "Libro no encontrado" });
        return;
      }
        
        const [result] = await pool.query(
          'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, `año-publicacion` = ?, ISBN = ? WHERE id = ?',
          [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN, libroId]
        );
    
    
        res.json({ "Registros actualizados": result.changedRows });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
      }
  }

}

export const libro = new LibroController();
