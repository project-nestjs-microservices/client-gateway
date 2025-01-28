## Client Gateway
El gateway es el punto de comunicación entre nuestros clientes y nuestros servicios.
Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes
y devolver la respuesta al cliente

## Dev
1. Clonar el repositorio
2. Instalar dependencias `npm install`
3. Crear un archivo `.env` basado en el `.env.template`
4. Tener levantados los microservicios que se van a consumir
5. Levantar el proyecto con `npm run start:dev`

## Nats
```shell
docker run -d --name transports-server -p 4222:4222 -p 8222:8222 transports
```

