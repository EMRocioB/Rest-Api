// Importa las bibliotecas necesarias para la aplicación.
import express from "express"; // Express: marco de aplicación web para Node.js.
import morgan from "morgan"; // Morgan: middleware de registro de solicitudes HTTP.
import {router} from "./routes.js";// Importa un enrutador personalizado definido en otro archivo.


const app = express();// Crea una instancia de la aplicación Express

app.set('port', 3000);// Configura el puerto en el que se ejecutará el servidor web.

app.use(morgan('dev'));// Configura el middleware de registro de solicitudes para ver información detallada sobre las solicitudes HTTP.
app.use(express.json());// Configura el middleware para analizar el cuerpo de las solicitudes en formato JSON.
app.use(router);// Asocia el enrutador importado para manejar las rutas de la aplicación.

// Inicia el servidor web y lo hace escuchar en el puerto configurado.
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})



 