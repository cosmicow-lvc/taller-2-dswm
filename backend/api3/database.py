import asyncpg

async def get_connection():
    return await asyncpg.connect(
        user="postgres",
        password="123",
        database="monster_high",
        host="127.0.0.1",
        port="5432"
    )
