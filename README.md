# Producción

Para desplegar la aplicación en un entorno de producción, puedes utilizar Docker Compose. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.
Debes crear un `.env` a partir de `.env.example`

## Despliegue

1. Clona el repositorio:

   ```bash
   git clone https://github.com/user/este-repositorio.git
   ```

2. Construye y levanta los contenedores con Docker compose:

   ```bash
   docker-compose up --build
   ```

   Esto construirá las imágenes de Docker necesarias y levantará los contenedores definidos en tu archivo docker-compose.yml.

# Dev

## Descripción

Este proyecto es una aplicación de backend desarrollada con Node.js y Express. Proporciona una serie de utilidades y funciones para manejar respuestas HTTP, incluyendo respuestas exitosas y de error con soporte para paginación.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd <tu-repositorio>
   ```

3. Instala las dependencias

   ```bash
    pnpm install
   ```

# Uso

Debes crear un `.env` a partir de `.env.example`

Iniciar el servidor

Para Iniciar el servidor, ejecua el siguiennte comando:

```bash
  pnpm start:dev
```

# Endpoints

Respuesta Exitosa
espuesta Exitosa
Puedes utilizar la función `successResponse` para enviar una respuesta exitosa. Aquí hay un ejemplo de uso:

```ts
import { successResponse } from './utils/response-helper'
import { HttpStatusCode } from 'errors'
import { Response } from 'express'

const exampleUsage = (res: Response) => {
  successResponse({
    res,
    data: { example: 'data' },
    message: 'Request accepted',
    statusCode: HttpStatusCode.Accepted,
  })
}
```

Respuesta con Error
Puedes utilizar la función `errorResponse` para enviar una respuesta con error. Aquí hay un ejemplo de uso:

```ts
import { errorResponse } from './utils/response-helper'
import { HttpStatusCode } from 'errors'
import { Response } from 'express'

const exampleUsage = (res: Response) => {
  errorResponse({
    res,
    message: 'An error occurred',
    errors: [{ msg: 'Invalid input', path: 'exampleField' }],
    statusCode: HttpStatusCode.BadRequest,
  })
}
```

# Estructura del Proyecto

```bash
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── logs
│   ├── combined.log
│   └── errors.log
├── README.md
├── src
│   ├── config
│   │   ├── constants.ts
│   │   ├── envs.ts
│   │   ├── index.ts
│   │   └── passport.config.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── general.controller.ts
│   │   └── index.ts
│   ├── database
│   │   ├── connection.ts
│   │   └── index.ts
│   ├── errors
│   │   ├── api-error.ts
│   │   ├── http-status-codes.ts
│   │   └── index.ts
│   ├── interfaces
│   │   └── index.ts
│   ├── main.ts
│   ├── middlewares
│   │   ├── error-handler.ts
│   │   ├── index.ts
│   │   └── payload-validator.ts
│   ├── models
│   │   ├── auth.model.ts
│   │   ├── departaments.model.ts
│   │   ├── documents.model.ts
│   │   ├── index.ts
│   │   ├── municipality.model.ts
│   │   └── registrationRequest.model.ts
│   ├── routes
│   │   ├── auth.route.ts
│   │   ├── general.route.ts
│   │   ├── index.ts
│   │   └── validations
│   │       ├── auth.validation.ts
│   │       ├── index.ts
│   │       ├── pagination.validation.ts
│   │       └── query.validation.ts
│   ├── seeders
│   │   ├── app-seeder.ts
│   │   └── index.ts
│   ├── server.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── aws-s3.service.ts
│   │   ├── general.service.ts
│   │   ├── index.ts
│   │   └── user.service.ts
│   ├── strategies
│   │   ├── index.ts
│   │   └── jwt.strategy.ts
│   └── utils
│       ├── index.ts
│       ├── logger.ts
│       ├── page-builder.ts
│       └── response-helper.ts
└── tsconfig.json
```
