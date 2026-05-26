use ISIS2304D28202610;

db.runCommand({
  collMod: "resenas",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "idReserva",
        "idHotel",
        "hotel",
        "idCliente",
        "cliente",
        "calificacion",
        "texto",
        "fechaCreacion",
        "estado",
        "destacada",
        "cantidadVotosUtiles"
      ],
      properties: {

        idReserva: {
          bsonType: "int"
        },

        idHotel: {
          bsonType: "int"
        },

        hotel: {
          bsonType: "object",
          required: ["nombre", "ciudad"],
          properties: {
            nombre: {
              bsonType: "string"
            },
            ciudad: {
              bsonType: "string"
            }
          }
        },

        idCliente: {
          bsonType: "int"
        },

        cliente: {
          bsonType: "object",
          required: ["nombreVisible"],
          properties: {
            nombreVisible: {
              bsonType: "string"
            }
          }
        },

        calificacion: {
          bsonType: "int",
          minimum: 1,
          maximum: 5
        },

        texto: {
          bsonType: "string",
          minLength: 5
        },

        fechaCreacion: {
          bsonType: "date"
        },

        fechaActualizacion: {
          bsonType: ["date", "null"]
        },

        estado: {
          enum: [
            "publicada",
            "eliminada"
          ]
        },

        destacada: {
          bsonType: "bool"
        },

        cantidadVotosUtiles: {
          bsonType: "int",
          minimum: 0
        },

        votosUtilidad: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: [
              "idUsuario",
              "fecha"
            ],
            properties: {
              idUsuario: {
                bsonType: "int"
              },
              fecha: {
                bsonType: "date"
              }
            }
          }
        },

        respuestaAdministrador: {
          bsonType: ["object", "null"],
          properties: {

            idAdministrador: {
              bsonType: "int"
            },

            texto: {
              bsonType: "string"
            },

            fechaRespuesta: {
              bsonType: "date"
            },

            fechaActualizacion: {
              bsonType: "date"
            }
          }
        }
      }
    }
  },

  validationLevel: "strict",
  validationAction: "error"
});