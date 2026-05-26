from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

app = FastAPI()

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================
# MongoDB
# =========================================

MONGO_URI = "mongodb://USUARIO:CONTRASEÑA@157.253.236.88:8087"

client = MongoClient(MONGO_URI)

db = client["ISIS2304D28202610"]

resenas = db["resenas"]

# =========================================
# Helper
# =========================================

def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])

    for key, value in doc.items():
        if isinstance(value, datetime):
            doc[key] = value.isoformat()

    if doc.get("votosUtilidad"):
        for voto in doc["votosUtilidad"]:
            if "fecha" in voto and isinstance(voto["fecha"], datetime):
                voto["fecha"] = voto["fecha"].isoformat()

    if doc.get("respuestaAdministrador"):
        respuesta = doc["respuestaAdministrador"]
        if "fechaRespuesta" in respuesta and isinstance(respuesta["fechaRespuesta"], datetime):
            respuesta["fechaRespuesta"] = respuesta["fechaRespuesta"].isoformat()
        if "fechaActualizacion" in respuesta and isinstance(respuesta["fechaActualizacion"], datetime):
            respuesta["fechaActualizacion"] = respuesta["fechaActualizacion"].isoformat()

    return doc

# =========================================
# RF4
# Consultar reseñas hotel
# =========================================

@app.get("/hoteles/{hotel_id}/resenas")
def obtener_resenas(hotel_id: int):

    data = list(
        resenas.find(
            {
                "idHotel": hotel_id,
                "estado": "publicada"
            }
        )
    )

    return [serialize_doc(d) for d in data]

# =========================================
# RF1
# Crear reseña
# =========================================

@app.post("/hoteles/{hotel_id}/resenas")
def crear_resena(hotel_id: int, datos: dict):

    documento = {
        "idReserva": datos["idReserva"],

        "idHotel": hotel_id,

        "hotel": {
            "nombre": datos["hotelNombre"],
            "ciudad": datos["hotelCiudad"]
        },

        "idCliente": datos["idCliente"],

        "cliente": {
            "nombreVisible": datos["nombreCliente"]
        },

        "calificacion": datos["calificacion"],

        "texto": datos["texto"],

        "fechaCreacion": datetime.utcnow(),

        "fechaActualizacion": None,

        "estado": "publicada",

        "destacada": False,

        "cantidadVotosUtiles": 0,

        "votosUtilidad": [],

        "respuestaAdministrador": None
    }

    resultado = resenas.insert_one(documento)

    return {
        "mensaje": "Reseña creada",
        "id": str(resultado.inserted_id)
    }

# =========================================
# RF2
# Editar reseña
# =========================================

@app.put("/resenas/{resena_id}")
def editar_resena(resena_id: str, datos: dict):

    resenas.update_one(
        {
            "_id": ObjectId(resena_id)
        },
        {
            "$set": {
                "texto": datos["texto"],
                "calificacion": datos["calificacion"],
                "fechaActualizacion": datetime.utcnow()
            }
        }
    )

    return {
        "mensaje": "Reseña actualizada"
    }

# =========================================
# RF3
# Eliminar reseña
# =========================================

@app.delete("/resenas/{resena_id}")
def eliminar_resena(resena_id: str):

    resenas.update_one(
        {
            "_id": ObjectId(resena_id)
        },
        {
            "$set": {
                "estado": "eliminada"
            }
        }
    )

    return {
        "mensaje": "Reseña eliminada"
    }

# =========================================
# RF5
# Marcar útil
# =========================================

@app.post("/resenas/{resena_id}/util")
def marcar_util(resena_id: str, datos: dict):

    voto = {
        "idUsuario": datos["idUsuario"],
        "fecha": datetime.utcnow()
    }

    resenas.update_one(
        {
            "_id": ObjectId(resena_id)
        },
        {
            "$push": {
                "votosUtilidad": voto
            },
            "$inc": {
                "cantidadVotosUtiles": 1
            }
        }
    )

    return {
        "mensaje": "Voto registrado"
    }

# =========================================
# RF7
# Respuesta administrador
# =========================================

@app.post("/resenas/{resena_id}/respuesta")
def responder_resena(resena_id: str, datos: dict):

    respuesta = {
        "idAdministrador": datos["idAdministrador"],
        "texto": datos["texto"],
        "fechaRespuesta": datetime.utcnow(),
        "fechaActualizacion": datetime.utcnow()
    }

    resenas.update_one(
        {
            "_id": ObjectId(resena_id)
        },
        {
            "$set": {
                "respuestaAdministrador": respuesta
            }
        }
    )

    return {
        "mensaje": "Respuesta agregada"
    }

# =========================================
# RF9
# Destacar reseña
# =========================================

@app.post("/resenas/{resena_id}/destacar")
def destacar_resena(resena_id: str):

    reseña = resenas.find_one(
        {
            "_id": ObjectId(resena_id)
        }
    )

    hotel_id = reseña["idHotel"]

    resenas.update_many(
        {
            "idHotel": hotel_id
        },
        {
            "$set": {
                "destacada": False
            }
        }
    )

    resenas.update_one(
        {
            "_id": ObjectId(resena_id)
        },
        {
            "$set": {
                "destacada": True
            }
        }
    )

    return {
        "mensaje": "Reseña destacada"
    }