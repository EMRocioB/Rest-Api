# REST API con Node.js

API RESTful desarrollada en **JavaScript con Node.js**, que implementa las operaciones CRUD completas sobre un recurso. Diseñada con una estructura limpia y modular, siguiendo las convenciones estándar de las APIs REST.

## Tecnologías utilizadas

- **Runtime:** Node.js
- **Lenguaje:** JavaScript
- **Arquitectura:** REST (Representational State Transfer)
- **Formato de datos:** JSON

## Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/recursos` | Obtener todos los registros |
| `GET` | `/api/recursos/:id` | Obtener un registro por ID |
| `POST` | `/api/recursos` | Crear un nuevo registro |
| `PUT` | `/api/recursos/:id` | Actualizar un registro existente |
| `DELETE` | `/api/recursos/:id` | Eliminar un registro |

## Estructura del proyecto

```
Rest-Api/
├── src/
│   ├── routes/       # Definición de rutas
│   ├── controllers/  # Lógica de cada endpoint
│   └── index.js      # Punto de entrada
├── script/
├── package.json
└── README.md
```

## Requisitos previos

- [Node.js](https://nodejs.org/) v14 o superior
- npm

## Cómo ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/EMRocioB/Rest-Api.git
cd Rest-Api

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start

# La API estará disponible en: http://localhost:3000
```

## Ejemplo de uso

```bash
# Obtener todos los recursos
curl http://localhost:3000/api/recursos

# Crear un nuevo recurso
curl -X POST http://localhost:3000/api/recursos \
  -H "Content-Type: application/json" \
  -d '{"nombre": "ejemplo", "descripcion": "dato de prueba"}'
```

## Conceptos aplicados

- Separación en capas: **rutas → controladores**
- Respuestas con **códigos HTTP estándar** (200, 201, 404, 500)
- Manejo de errores centralizado
- Datos en formato **JSON**

---

Desarrollado por [Rocio Burguener](https://github.com/EMRocioB)
