// Importa la biblioteca 'mysql2/promise' para trabajar con MySQL de forma asincrónica.
import mysqlConnection from 'mysql2/promise';

// Define un objeto 'properties' que contiene la configuración de la conexión a la base de datos.
const properties = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biblioteca',
};

// Crea un grupo de conexiones a la base de datos (pool) utilizando la configuración definida en 'properties'.
// Esto permite administrar múltiples conexiones de manera eficiente.
export const pool = mysqlConnection.createPool(properties);