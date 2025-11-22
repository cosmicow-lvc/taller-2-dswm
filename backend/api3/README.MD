Este documento se centra en la **instalación y documentación de la API Pokémon**.

---

## 🚀 Instalación y Ejecución (API Pokémon)

Sigue estos pasos para levantar el servidor de la API Pokémon.

### 1. Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu máquina local:

* [PostgreSQL](https://www.postgresql.org/download/) (v14 o superior)
* [Python](https://www.python.org/downloads/windows) (v3.13 o superior)


### 2. Configuración de la Base de Datos

1.  **Crear la Base de Datos:**
    Se levanta con docker 
2.  **Configurar Variables de Entorno :**
    * En la carpeta `api3` abre el archivo `database.py` y rellena los datos de tu base de datos local:
        ```ini
        # Puerto de la API
        PORT=3000

        # Configuración de PostgreSQL
        DB_HOST=fastapi-db
        DB_PORT=5432
        DB_DATABASE=monster_high  # El nombre que usaste en el paso 1
        DB_USER=postgres        # Tu usuario de Postgres
        DB_PASSWORD=admin123    # Tu contraseña de Postgres
        ```

   
### 4. Ejecución
   - docker compose up --build
