use ISIS2304D28202610;

db.resenas.insertMany([

  {
    idReserva: 101,
    idHotel: 1,

    hotel: {
      nombre: "Dann Carlton Bogotá",
      ciudad: "Bogotá"
    },

    idCliente: 10,

    cliente: {
      nombreVisible: "Carlos M."
    },

    calificacion: 5,

    texto: "Excelente atención y habitaciones muy cómodas.",

    fechaCreacion: ISODate("2026-01-15T10:00:00Z"),

    fechaActualizacion: null,

    estado: "publicada",

    destacada: true,

    cantidadVotosUtiles: 8,

    votosUtilidad: [
      {
        idUsuario: 20,
        fecha: ISODate("2026-01-16T10:00:00Z")
      }
    ],

    respuestaAdministrador: {
      idAdministrador: 1,
      texto: "Gracias por compartir su experiencia.",
      fechaRespuesta: ISODate("2026-01-17T10:00:00Z"),
      fechaActualizacion: ISODate("2026-01-17T10:00:00Z")
    }
  },

  {
    idReserva: 102,
    idHotel: 1,

    hotel: {
      nombre: "Dann Carlton Bogotá",
      ciudad: "Bogotá"
    },

    idCliente: 11,

    cliente: {
      nombreVisible: "Laura P."
    },

    calificacion: 4,

    texto: "Muy buena experiencia aunque el check in fue lento.",

    fechaCreacion: ISODate("2026-02-10T10:00:00Z"),

    fechaActualizacion: null,

    estado: "publicada",

    destacada: false,

    cantidadVotosUtiles: 3,

    votosUtilidad: [],

    respuestaAdministrador: null
  },

  {
    idReserva: 103,
    idHotel: 2,

    hotel: {
      nombre: "Dann Medellín",
      ciudad: "Medellín"
    },

    idCliente: 12,

    cliente: {
      nombreVisible: "Ana R."
    },

    calificacion: 5,

    texto: "Excelente ubicación y muy buen servicio.",

    fechaCreacion: ISODate("2026-03-05T10:00:00Z"),

    fechaActualizacion: null,

    estado: "publicada",

    destacada: false,

    cantidadVotosUtiles: 12,

    votosUtilidad: [],

    respuestaAdministrador: {
      idAdministrador: 2,
      texto: "Nos alegra que haya disfrutado su estadía.",
      fechaRespuesta: ISODate("2026-03-06T10:00:00Z"),
      fechaActualizacion: ISODate("2026-03-06T10:00:00Z")
    }
  },

  {
    idReserva: 104,
    idHotel: 3,

    hotel: {
      nombre: "Dann Cali",
      ciudad: "Cali"
    },

    idCliente: 13,

    cliente: {
      nombreVisible: "Miguel T."
    },

    calificacion: 2,

    texto: "El servicio fue regular y hubo mucho ruido.",

    fechaCreacion: ISODate("2026-04-02T10:00:00Z"),

    fechaActualizacion: null,

    estado: "publicada",

    destacada: false,

    cantidadVotosUtiles: 1,

    votosUtilidad: [],

    respuestaAdministrador: null
  }

]);