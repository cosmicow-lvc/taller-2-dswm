import asyncpg

async def get_connection():
    return await asyncpg.connect(
        user="Mi_Usuario_Postgres",
        password="Mi_Contraseña_Postgres",
        database="monster_high",
        host="fastapi-db",
        port="5432"
    )
