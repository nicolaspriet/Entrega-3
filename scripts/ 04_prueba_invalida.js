use ISIS2304D28202610;

db.resenas.insertOne({

  idReserva: 999,

  idHotel: 1,

  hotel: {
    nombre: "Dann Test",
    ciudad: "Bogotá"
  },

  idCliente: 99,

  cliente: {
    nombreVisible: "Usuario Test"
  },

  calificacion: 9,

  texto: "bad",

  fechaCreacion: ISODate("2026-05-20T10:00:00Z"),

  estado: "publicada",

  destacada: false,

  cantidadVotosUtiles: 0
});