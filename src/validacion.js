function validacionLibro(libro) {
    if (!libro.nombre || !libro.autor || !libro.categoria || !libro['año-publicacion'] || !libro.ISBN) {
        throw new Error("Datos incompletos. Asegúrese de proporcionar nombre, autor, categoria año de publicacion e ISBN.");
    }
  
    const validFields = ["id", "nombre", "autor", "categoria", "año-publicacion", "ISBN"];
    const incomingFields = Object.keys(libro);
    for (let field of incomingFields) {
        if (!validFields.includes(field)) {
            throw new Error(`Campo no permitido: ${field}`);
        }
    }
  }

  export default validacionLibro;

