db.runCommand({
  collMod: "resenas",

  validator: {
    $jsonSchema: {
      bsonType: "object",

      required: [
        "idReserva",
        "idHotel",
        "idCliente",
        "calificacion",
        "texto",
        "estado"
      ],

      properties: {

        idReserva: {
          bsonType: "int"
        },

        idHotel: {
          bsonType: "int"
        },

        idCliente: {
          bsonType: "int"
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

        estado: {
          enum: ["publicada", "eliminada"]
        },

        destacada: {
          bsonType: "bool"
        },

        cantidadVotosUtiles: {
          bsonType: "int",
          minimum: 0
        }
      }
    }
  },

  validationLevel: "strict",
  validationAction: "error"
});