from database import get_connection


async def obtener_personajes():
    conn = await get_connection()
    rows = await conn.fetch("SELECT * FROM personajes;")
    await conn.close()
    return [dict(r) for r in rows]

async def obtener_personaje(id: int):
    conn = await get_connection()
    row = await conn.fetchrow("SELECT * FROM personajes WHERE id = $1;", id)
    await conn.close()
    return dict(row) if row else None


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


async def eliminar_personaje(id: int):
    conn = await get_connection()
    await conn.execute("DELETE FROM personajes WHERE id = $1;", id)
    await conn.close()
    return {"mensaje": "Personaje eliminado"}
async def actualizar_personaje(id: int, nombre=None, edad=None, especie_id=None, personalidad=None):
    conn = await get_connection()
    query = """
    UPDATE personajes
    SET 
        nombre = COALESCE($1, nombre),
        edad = COALESCE($2, edad),
        especie_id = COALESCE($3, especie_id),
        personalidad = COALESCE($4, personalidad)
    WHERE id = $5
    RETURNING *;
    """
    row = await conn.fetchrow(query, nombre, edad, especie_id, personalidad, id)
    await conn.close()
    if row:
        return dict(row)
    return {"error": "Personaje no encontrado"}
