# ProjectRS
_Proyecto desarrollado para una entidad de salud para el mantenimiento de los datos de sus profesionales y pacientes con el objetivo de brindar una información centralizada en una misma aplicación destacando las características propias para cada tipo de usuario. La aplicación permite además la eliminación de todos aquellos usuarios profesionales que cumplan con determinado criterio (como el de ser médicos), así como la visualización de los datos personales de cada uno, su modificación y eliminación._

## Comenzando
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento desde tu máquina local para propósitos de desarrollo._
<ol>
  <li>Descargue una copia del proyecto en su ordenador o clone el repositorio en un ruta del mismo.</li>
  <li>Ejecutar npm install para descargar las depedencias de node</li>
  <li>Adicionalmente el proyecto cuenta con dependencia de un servidor externo para el almacenamiento de los datos que podrá descargar en la siguiente ruta siguiendo las instrucciones que ahí se indican</li>
  <li>Para visualizarlo en el navegador por medio del comando ng serve podrá consumir la aplicacción</li>
  <li>La ruta para consumir el proyecto son http://localhost:4200/</li>
</ol>
    
Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

### Accediendo a la aplicación
_Una vez configurado de forma correcta podrá visualizar la página de acceso al mismo donde deberás proporcionar las credenciales correctas para poder acceder_
<img src="">
<br>
Nombre de usuario: ale@mail.com
Contraseña: 1234
<br>
Una vez autenticado verás el siguiente mensaje y automáticamente se le redigirá a la pantalla principal de la aplicación donde se muestra el listado correspondiente a los usuarios que actualmente se encuentran almacenados en el sistema.

###¿Qué puedes hacer una vez registrado?

# Descripción
Proyecto de ejemplo en Angular 9 para realizar el CRUD de usuarios de un hospital. Estos se dividen en dos tipos: profesionales y pacientes. La aplicación permite además la eliminación de todos aquellos usuarios profesionales que sena médicos, así como la visualización de los datos personales de cada uno y su modificación.

# Cómo usarlo?
Descargar el proyecto en su ordenador
1. Ejecutar npm install para descargar las depedencias de node
2. Para visualizarlo en el navegador por medio del comando ng serve, se puede consumir la aplicacción
3. Adicionalmente desde a ruta src/app/server deberá de desplegar el servidor json donde se encuentran alojados los datos mediante el comando
json-server --watch db.json

4. La ruta para consumir el proyecto son http://localhost:4200/
