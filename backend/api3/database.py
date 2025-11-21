import asyncpg

async def get_connection():
    return await asyncpg.connect(
        user="postgres",
        password="123",
        database="monster_high",
        host="fastapi-db",
        port="5432"
    )
