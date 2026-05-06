# Gateway Microservice

## Dev

1. Clonar repositorio
2. Instalar dependencias
3. Crear un archivo `.env` con las variables de entorno basado en el `.env.example`
4. Ejecutar `npm run start:dev`

##Nats

```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
