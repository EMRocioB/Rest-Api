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


  // Método add: Agrega uno o varios libros a la base de datos.
  async add(req, res){
      const libros = req.body;// Recupera la información de los libros desde el cuerpo de la solicitud.
      const insertIds = [];// Un arreglo para almacenar los IDs de los registros insertados con éxito.
      for (const libro of libros) {// Recorre cada libro en la lista de libros proporcionada.
           // Realiza una consulta SQL para insertar un nuevo registro en la tabla 'libros' con los datos del libro actual.
          const [result] = await pool.query(`INSERT INTO libros(nombre, autor, categoria, año-publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, 
          [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN]);
          insertIds.push(result.insertId);// Agrega el ID del registro recién insertado al arreglo insertIds.
      }
      res.json({ "ids insertados": insertIds });// Responde con un objeto JSON que contiene los IDs de los registros que se insertaron correctamente.
  }

  // Método delete: Elimina un libro de la base de datos por su ID.
  async delete(req, res){
      const libro = req.body;// Recupera la información del libro a eliminar desde el cuerpo de la solicitud.
      // Realiza una consulta SQL para eliminar el registro de la tabla 'libros' con el ID proporcionado.
      const [result] = await pool.query(`DELETE FROM libros WHERE id=(?)`,[libro.id]);
      // Responde con un objeto JSON que contiene la cantidad de registros afectados por la operación de eliminación.
      res.json({"Registrados Eliminados": result.affectedRows});
  }

  // Método update: Actualiza un libro en la base de datos.
  async update(req, res) {
      const libro = req.body;// Recupera la información del libro actualizado desde el cuerpo de la solicitud.
      // Realiza una consulta SQL para actualizar el registro en la tabla 'libros' con la información proporcionada.
      const [result] = await pool.query(
        'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, `año-publicacion` = ?, ISBN = ? WHERE id = ?',
        [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN, libro.id]
      );
      // Responde con un objeto JSON que contiene la cantidad de registros actualizados como resultado de la operación de actualización.
      res.json({ "Registrados Actualizados": result.changedRows });
  }    

}

export const libro = new LibroController();