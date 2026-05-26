use ISIS2304D28202610;

db.createCollection("resenas");

db.resenas.createIndex(
  { idReserva: 1 },
  { unique: true }
);

db.resenas.createIndex({
  idHotel: 1,
  fechaCreacion: -1
});

db.resenas.createIndex({
  idCliente: 1,
  fechaCreacion: -1
});

db.resenas.createIndex({
  destacada: -1
});

db.resenas.createIndex({
  cantidadVotosUtiles: -1
});

db.resenas.createIndex({
  "hotel.ciudad": 1
});

db.resenas.createIndex({
  estado: 1
});