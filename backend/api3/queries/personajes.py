from database import get_connection

# OBTENER TODOS LOS PERSONAJES
async def obtener_personajes():
    conn = await get_connection()
    rows = await conn.fetch("SELECT * FROM personajes;")
    await conn.close()
    return [dict(r) for r in rows]

# OBTENER PERSONAJE POR ID
async def obtener_personaje(id: int):
    conn = await get_connection()
    row = await conn.fetchrow("SELECT * FROM personajes WHERE id = $1;", id)
    await conn.close()
    return dict(row) if row else None

# CREAR PERSONAJE
async def crear_personaje(nombre: str, edad: int, especie_id: int, personalidad: str):
    conn = await get_connection()
    await conn.execute(
        """
        INSERT INTO personajes (nombre, edad, especie_id, personalidad)
        VALUES ($1, $2, $3, $4);
        """,
        nombre, edad, especie_id, personalidad
    )
    await conn.close()
    return {"mensaje": "Personaje creado"}

# ELIMINAR PERSONAJE
async def eliminar_personaje(id: int):
    conn = await get_connection()
    await conn.execute("DELETE FROM personajes WHERE id = $1;", id)
    await conn.close()
    return {"mensaje": "Personaje eliminado"}
