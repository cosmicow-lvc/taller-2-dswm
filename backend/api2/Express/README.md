Este documento se centra en la **instalación y documentación de la API Pokémon**.

---

## 🚀 Instalación y Ejecución (API Pokémon)

Sigue estos pasos para levantar el servidor de la API Pokémon.

### 1. Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu máquina local:
* [Node.js](https://nodejs.org/) (v18 o superior)
* [NPM](https://www.npmjs.com/) (generalmente se instala con Node.js)
* [PostgreSQL](https://www.postgresql.org/download/) (v14 o superior)
* Un cliente de base de datos como [pgAdmin](https://www.pgadmin.org/) (recomendado)

### 2. Instalación del Servidor

1.  Clona este repositorio.
2.  Navega a la carpeta de la API de Pokémon:
    ```bash
    cd taller-2-dswm/backend/api2/Express
    ```
3.  Instala las dependencias de Node.js:
    ```bash
    npm install
    ```

### 3. Configuración de la Base de Datos

1.  **Crear la Base de Datos:**
    * Abre pgAdmin (o tu cliente de SQL) y conéctate a tu servidor PostgreSQL.
    * Crea una nueva base de datos. El nombre recomendado es `pokedex_db`.
    ** Poblar la base de datos:**
        - docker compose run api2 npm run seed
2.  **Configurar Variables de Entorno (`.env`):**
    * En la carpeta `Express`, renombra el archivo `.env.example` a `.env`.
    * Abre el archivo `.env` y rellena los datos de tu base de datos local:
        ```ini
        # Puerto de la API
        PORT=3000

        # Configuración de PostgreSQL
        DB_HOST=localhost
        DB_PORT=5432
        DB_DATABASE=pokedex_db  # El nombre que usaste en el paso 1
        DB_USER=postgres        # Tu usuario de Postgres
        DB_PASSWORD=admin123    # Tu contraseña de Postgres
        ```

3.  **Crear las Tablas:**
    * Abre el script `backend/api2/Postgresql/init.sql` en tu cliente de SQL (pgAdmin) o directamente en el IDE
    * **¡Importante!** Asegúrate de estar conectado y ejecutando la consulta en la base de datos `pokedex_db` (no en la base de datos `postgres` por defecto).
    * Ejecuta el script. Esto creará las tablas `pokemon`, `types` y `pokemon_types`.

4.  **Poblar la Base de Datos (Seeding):**
    * Una vez creadas las tablas (que estarán vacías), debes poblarlas.
    * Ejecuta el siguiente comando en tu terminal (en la carpeta `Express`). **Esto se hace solo una vez.**
    ```bash
    npx ts-node src/scripts/seed.ts
    ```
    * El script tardará 1-2 minutos en descargar los 151 Pokémon de la PokeAPI e insertarlos en tu base de datos local.

### 5. Ejecución

Con la base de datos lista, puedes iniciar el servidor:

```bash
# Inicia el servidor en modo de desarrollo (se reinicia con los cambios)
npm run dev