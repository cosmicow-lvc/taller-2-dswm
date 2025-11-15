# Taller 2 - Desarrollo de soluciones Web/Movil
**Grupo 4**
1. Máximo Jofré, 21675371-2
2. Sofía Contreras, 21702328-9
3. Diego Adaos, 21535504-7
4. Antonio Tabilo, 21668377-3

## Base de datos 1 - PostgreSQL

Tiene esta estructura tanto tanto [Imagen]

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

Para levantar la API se ocupa

```
npm install
npm run start:dev
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

**Para levantar la API se debe:**

1.Crear la base de datos

Por defecto, la aplicación buscará una llamada *bolamagica_db*.

2.Configurar archivo env

Establecer su contraseña dentro del archivo .env

3.Comandos de ejecución

```
npm install
npm run start:dev
```

## Base de datos 2 - PostgreSQL

Tiene esta estructura tanto tanto [Imagen]

## API 2: Tema - Express (Node.js)

Para los metodos CRUD tienen el formato tanto tanto retornan elementos con esta estructura JSON tanto tanto

Para levantar la API se ocupa

```
npm install
npm run dev
```

## Base de datos 3 - PostgreSQL

Tiene esta estructura tanto tanto [Imagen]

## API 3: Tema - Python (FastAPI)

Para los metodos CRUD tienen el formato tanto tanto retornan elementos con esta estructura JSON tanto tanto

Para levantar la API se ocupa

```
npm install
npm run dev
```

## Frontend

Consume las 3 APIs mencionadas anteriormente, ocupando HTML + Tailwind CSS + JS

Además se generó una APK para Android utilizando Apache Cordova
