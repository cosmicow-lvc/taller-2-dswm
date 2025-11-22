## 📚 Documentación de la API (Estilo Swagger)

A continuación se detallan los *endpoints* disponibles en la **API Pokémon**.

**URL Base:** `http://localhost:3002/docs`

### 1. Monster_high (CRUD)

#### `GET /personajes`
Obtiene una lista paginada de Pokémon.


* **Ejemplo de Petición:**
    `GET "http://localhost:3002/personajes"
* **Respuesta Exitosa (200 OK):**
    ```json
    [
    {
        "id": 1,
        "nombre": "Draculaura",
        "edad": 16,
        "especie_id": 1,
        "personalidad": "Amable y dulce"
    },
    {
        "id": 2,
        "nombre": "Clawdeen Wolf",
        "edad": 16,
        "especie_id": 2,
        "personalidad": "Valiente y feroz"
    }
    ]
    ```

#### `GET /personajes/{id}`
Obtiene los detalles de un solo Pokémon por su ID o nombre.

* **Parámetros de Ruta:**
    * `id` (string | number): El ID (ej. 1).
* **Ejemplo de Petición:**
    `GET http://localhost:3002/personajes/1`
* **Respuesta Exitosa (200 OK):**
    ```json
        {
        "id": 1,
        "nombre": "Draculaura",
        "edad": 16,
        "especie_id": 1,
        "personalidad": "Amable y dulce"
        }


#### `POST /personajes`
Añade un nuevo personaje en la base de datos.

* **Body (JSON Requerido):**
    ```json
    {
      "nombre": "Clawd Wolf",
      "edad": "17",
      "especie_id": "2",
      "personalidad": "Un líder de manada no puede tener favoritos.",
  
    }
 

#### `PUT /personajes/{id}`
Actualiza un personaje existente por su ID.

* **Parámetros de Ruta:**
    * `id` (number): El ID del personaje a actualizar.

* **Body (JSON Requerido):**
    ```json

    { 
        "id": 1,
        "nombre": "Draculaura",
        "edad": 16,
        "especie_id": 1,
        "personalidad": "Vampireza atrevida"
    }
    ```


#### `DELETE /pokemon/:id`
Elimina un personaje de la base de datos por su ID.

* **Parámetros de Ruta:**
    * `id` (number): El ID del personaje a eliminar.
* **Ejemplo de Petición:**
    `DELETE http://localhost:3002/docs#/default/borrar_personaje_personajes__id__delete`

#### `GET /especies`
Devuelve una lista con las especies disponibles
* **Respuesta Exitosa (200 OK):**
    ```json
        [
        {
            "id": 1,
            "nombre": "Dracula",
            "descripcion": "Vampiros"
        },
        {
            "id": 2,
            "nombre": "Lobo",
            "descripcion": "Hombres lobo"
        }
        ]
    '''
#### `POST /especies`
Añade una nueva especie a la base de datos.

* **Body (JSON Requerido):**
    ```json
    {
      "nombre": "Humana",
      "descripcion": "Homo Sapiens ",

    
  
    }