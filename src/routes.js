// Importa el enrutador y controladores necesarios para definir las rutas.
import { Router } from "express";
import { libro } from "./controller.js";

// Crea una instancia del enrutador de Express.
export const router = Router()

// Define las rutas y asocia cada una con un controlador específico.
router.get('/libros', libro.getAll);//obtener todos los libros.
router.get('/libros/:id', libro.getOne);//obtener un libro específico por su ID.










