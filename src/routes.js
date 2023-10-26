// Importa el enrutador y controladores necesarios para definir las rutas.
import { Router } from "express";
import { libro } from "./controller.js";

// Crea una instancia del enrutador de Express.
export const router = Router()

// Define las rutas y asocia cada una con un controlador específico.
router.get('/libros', libro.getAll);//obtener todos los libros.
router.get('/libros/:id', libro.getOne);//obtener un libro específico por su ID.

// Crear un nuevo libro
router.post('/libros', libro.add);

// Actualizar un libro específico por ID
router.put('/libros/:id', libro.update);

// Ruta para eliminar un libro por ISBN (desde la ruta o el cuerpo de la solicitud)
router.delete('/libros/delete/:ISBN', libro.deleteISBN);











