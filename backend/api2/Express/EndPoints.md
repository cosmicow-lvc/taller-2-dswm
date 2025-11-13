## 📚 Documentación de la API (Estilo Swagger)

A continuación se detallan los *endpoints* disponibles en la **API Pokémon**.

**URL Base:** `http://localhost:3000/api`

### 1. Pokémon (CRUD)

#### `GET /pokemon`
Obtiene una lista paginada de Pokémon.

* **Query Params (Opcionales):**
    * `limit` (number): Cantidad de Pokémon a devolver. (Default: 20)
    * `offset` (number): Número de Pokémon a saltar. (Default: 0)
* **Ejemplo de Petición:**
    `GET http://localhost:3000/api/pokemon?limit=5&offset=10`
* **Respuesta Exitosa (200 OK):**
    ```json
    [
      {
        "id": 11,
        "name": "metapod",
        "image_url": "[https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png)"
      },
      ...
    ]
    ```

#### `GET /pokemon/:idOrName`
Obtiene los detalles de un solo Pokémon por su ID o nombre.

* **Parámetros de Ruta:**
    * `idOrName` (string | number): El ID (ej. 25) o el nombre (ej. pikachu) del Pokémon.
* **Ejemplo de Petición:**
    `GET http://localhost:3000/api/pokemon/pikachu`
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "id": 25,
      "name": "pikachu",
      "image_url": "[https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)",
      "height": 4,
      "weight": 60,
      "types": [
        "electric"
      ]
    }
    ```
* **Respuesta de Error (404 Not Found):**
    ```json
    {
      "error": "Pokémon no encontrado"
    }
    ```

#### `POST /pokemon`
Crea un nuevo Pokémon en la base de datos.

* **Body (JSON Requerido):**
    ```json
    {
      "id": 800,
      "name": "Mewthree",
      "image_url": "[http://example.com/img.png](http://example.com/img.png)",
      "height": 10,
      "weight": 100
    }
    ```
* **Respuesta Exitosa (201 Created):**
    (Devuelve el objeto recién creado)
* **Respuesta de Error (409 Conflict):**
    (Si el `id` o `name` ya existen)
    ```json
    {
      "error": "El ID o nombre del Pokémon ya existe"
    }
    ```

#### `PUT /pokemon/:id`
Actualiza un Pokémon existente por su ID.

* **Parámetros de Ruta:**
    * `id` (number): El ID del Pokémon a actualizar.
* **Ejemplo de Petición:**
    `PUT http://localhost:3000/api/pokemon/800`
* **Body (JSON Requerido):**
    ```json
    {
      "name": "Mewthree Shiny",
      "image_url": "[http://example.com/img-shiny.png](http://example.com/img-shiny.png)",
      "height": 11,
      "weight": 101
    }
    ```
* **Respuesta Exitosa (200 OK):**
    (Devuelve el objeto actualizado)
* **Respuesta de Error (404 Not Found):**
    ```json
    {
      "error": "Pokémon no encontrado"
    }
    ```

#### `DELETE /pokemon/:id`
Elimina un Pokémon de la base de datos por su ID.

* **Parámetros de Ruta:**
    * `id` (number): El ID del Pokémon a eliminar.
* **Ejemplo de Petición:**
    `DELETE http://localhost:3000/api/pokemon/800`
* **Respuesta Exitosa (200 OK):**
    ```json
    {
      "message": "Pokémon eliminado exitosamente",
      "pokemon": {
        "id": 800,
        "name": "Mewthree Shiny",
        "image_url": "[http://example.com/img-shiny.png](http://example.com/img-shiny.png)",
        "height": 11,
        "weight": 101
      }
    }
    ```
* **Respuesta de Error (404 Not Found):**
    ```json
    {
      "error": "Pokémon no encontrado"
    }
    ```