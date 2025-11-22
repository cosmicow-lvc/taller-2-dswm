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



### 2. Configuración de la Base de Datos

1.  **Crear la Base de Datos:**
    Se levanta con docker 
2.  **Configurar Variables de Entorno (`.env`):**
    * En la carpeta `Express`, renombra el archivo `.env.example` a `.env`.
    * Abre el archivo `.env` y rellena los datos de tu base de datos local:
        ```ini
        # Puerto de la API
        PORT=3000

        # Configuración de PostgreSQL
        DB_HOST=express-db
        DB_PORT=5432
        DB_DATABASE=pokemon  # El nombre que usaste en el paso 1
        DB_USER=postgres        # Tu usuario de Postgres
        DB_PASSWORD=admin123    # Tu contraseña de Postgres
        ```

   

3.  **Poblar la Base de Datos (Seeding):**
  - docker compose run api2 npm run seed

### 4. Ejecución
   - docker compose up --build
