from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from queries.personajes import (
    obtener_personajes,
    obtener_personaje,
    crear_personaje,
    eliminar_personaje,
    actualizar_personaje
)
from queries.especies import obtener_especies, crear_especie

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://[::1]:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/personajes")
async def lista_personajes():
    return await obtener_personajes()

@app.get("/personajes/{id}")
async def ver_personaje(id: int):
    personaje = await obtener_personaje(id)
    if personaje:
        return personaje
    return {"error": "Personaje no encontrado"}

@app.post("/personajes")
async def nuevo_personaje(nombre: str, edad: int, especie_id: int, personalidad: str):
    return await crear_personaje(id,nombre, edad, especie_id, personalidad)

@app.put("/personajes/{id}")
async def modificar_personaje(id: int, nombre: str = None, edad: int = None, especie_id: int = None, personalidad: str = None):
    return await actualizar_personaje(id, nombre, edad, especie_id, personalidad)

@app.delete("/personajes/{id}")
async def borrar_personaje(id: int):
    return await eliminar_personaje(id)



@app.get("/especies")
async def lista_especies():
    return await obtener_especies()

@app.post("/especies")
async def nueva_especie(nombre: str, descripcion: str):
    return await crear_especie(nombre, descripcion)


@app.get("/")
async def root():
    return {"message": "Monster High API funcionando con asyncpg y SQL puro!"}
