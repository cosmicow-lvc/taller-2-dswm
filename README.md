# Taller 2 - Desarrollo de soluciones Web/Movil
**Grupo 4**
1. Máximo Jofré, 21675371-2
2. Sofía Contreras, 21702328-9
3. Diego Adaos, 21535504-7
4. Antonio Tabilo, 21668377-3


## Para utilizar Docker

En docker_compose.yml es necesario cambiar las credenciales de las bases de datos a las configuradas en cada maquina.
# Prerrequisitos
  Docker: https://docs.docker.com/get-started
# docker_compose.yml
services:
  # Bases de datos
  api2:
    build: ./backend/api2/Express
    volumes:
      - ./backend/api2/Express:/app
    ports:
      - "3006:3000"
    environment:
      - PORT=3000
      - DB_HOST=express-db
      - DB_USER=Mi_Usuario_Postgres 
      - DB_PASSWORD=Mi_Contraseña_Postgres
      - DB_NAME=pokemon
    depends_on:
      - express-db

  nest-db:
    image: postgres:15
    environment:
      POSTGRES_USER:Mi_Usuario_Postgres 
      POSTGRES_PASSWORD: Mi_Contraseña_Postgres
      POSTGRES_DB: bola_magica
    ports:
      - "5433:5432"

  fastapi-db:
    image: postgres:15
    environment:
      POSTGRES_USER:Mi_Usuario_Postgres 
      POSTGRES_PASSWORD: Mi_Contraseña_Postgres
      POSTGRES_DB: monster_high
    volumes:
      - ./backend/api3/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5434:5432"

  express-db:
    image: postgres:15
    environment:
      POSTGRES_USER:  Mi_Usuario_Postgres
      POSTGRES_PASSWORD: Mi_Contraseña_Postgres
      POSTGRES_DB: pokemon
    volumes:
      - ./backend/api2/Postgresql/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5435:5432"

  # Backends
  backend-nest:
    build: ./backend/api-nest
    depends_on:
      - nest-db
    environment:
        DB_HOST: nest-db
        DB_PORT: 5432
        DB_USERNAME: Mi_Usuario_Postgres
        DB_PASSWORD: Mi_Contraseña_Postgres
        DB_NAME: bola_magica
    ports:
      - "3001:3000"

  backend-fastapi:
    build: ./backend/api3
    depends_on:
      - fastapi-db
    environment:
      DATABASE_URL: postgres://Mi_Usuario_Postgres:Mi_Contraseña_Postgres@fastapi-db:5432/monster_high
    ports:
      - "3002:3000"

  backend-express:
    build: 
      context: ./backend/api2/Express
      dockerfile: dockerfile
    depends_on:
      - express-db
    environment:
      DATABASE_URL: postgres://Mi_Usuario_Postgres:Mi_Contraseña@express-db:5432/pokemon 
      
    ports:
      - "3003:3000"

## Levantar Docker
 - docker compose up --build

## API 1: BolaMagica - NestJS (Node.js + Typescript)

Para los metodos CRUD tienen el formato tanto tanto retornan elementos con esta estructura JSON tanto tanto

**Endpoints de la API**

```
GET /bola_magica
```
Retorna una respuesta aleatoria del conjunto total de frases.

Query Params: ?locale=es (opcional, idioma *en* por defecto).
```
{
  "reading": "Las perspectivas son buenas.",
  "locale": "es"
}
```


```
GET /bola_magica/categories
```
Retorna un objeto con todas las respuestas disponibles, agrupadas por su categoría (positiva, neutral o negativa).
```
{
  "positive": [
    "Es cierto.",
    "Decididamente sí.",
    "Sin lugar a dudas.",
    "..."
  ],
  "neutral": [
    "Respuesta confusa, intenta de nuevo.",
    "Pregunta de nuevo más tarde.",
    "..."
  ],
  "negative": [
    "No cuentes con ello.",
    "Mi respuesta es no.",
    "..."
  ],
  "locale": "es"
}

```


```
GET /bola_magica/:category
```
Retorna una respuesta aleatoria de una categoría específica.

- Path Params: category debe ser positive, negative o neutral.

- Query Params: ?locale=es.

Estructura JSON de respuesta:
```
{
  "reading": "Puedes contar con ello.",
  "category": "positive",
  "locale": "es"
}

```

```
GET /bola_magica/biased y POST /bola_magica/biased
```
Retorna una respuesta "sesgada" basada en un análisis de sentimiento simulado de la pregunta.

GET Query Params: ?question=... (requerido), ?lucky=true (opcional), ?locale=es (opcional).

POST Body: Acepta un JSON con { "question": "...", "lucky": true, "locale": "es" }.

```
{
  "reading": "Mi respuesta es no.",
  "question": "Will I win the lottery?",
  "sentiment": {
    "score": 0,
    "comparative": 0,
    "calculation": [],
    "tokens": ["will", "i", "win", "the", "lottery"],
    "words": [],
    "positive": [],
    "negative": []
  },
  "locale": "es",
  "lucky": false
}

```
## API 2: Tema - Express (Node.js)
->Ver README.MD carpeta api2/Express

## Base de datos 3 - PostgreSQL

La base de datos contiene 2 tablas, donde una pertenece a personajes de la serie "Monster High" y otra a las especies que existen en ese mundo.
La tabla personajes contiene:
ID                  PK
NOMBRE              
EDAD                
ID_ESPECIE          FK
DESCRIPCIÓN

La tabla especies contiene:
ID                  PK
ESPECIE
DESCRIPCIÓN

La relación es 1:N, una especie tiene muchos personajes.

Justificación: el uso de postgres con fastapi conduce a una buena integración de la misma con la utilización de python, permitiendo operaciones asincrónas y operaciones rápidas en la API

## API 3: Tema - Python (FastAPI)

->Ver README.MD carpeta api3

## Frontend

Consume las 3 APIs mencionadas anteriormente, ocupando HTML + Tailwind CSS + JS

Además se generó una APK para Android utilizando Apache Cordova
