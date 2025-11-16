from database import get_connection

async def obtener_especies():
    conn = await get_connection()
    rows = await conn.fetch("SELECT * FROM especies;")
    await conn.close()
    return [dict(r) for r in rows]

async def crear_especie(nombre: str, descripcion: str):
    conn = await get_connection()
    await conn.execute(
        "INSERT INTO especies (nombre, descripcion) VALUES ($1, $2);",
        nombre, descripcion
    )
    await conn.close()
    return {"mensaje": "Especie creada"}
