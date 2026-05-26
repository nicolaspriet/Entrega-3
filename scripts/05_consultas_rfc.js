use ISIS2304D28202610;

// =====================================================
// RFC1
// Top 10 hoteles por calificación promedio
// =====================================================

db.resenas.aggregate([

  {
    $match: {
      estado: "publicada"
    }
  },

  {
    $group: {
      _id: "$idHotel",

      nombreHotel: {
        $first: "$hotel.nombre"
      },

      ciudad: {
        $first: "$hotel.ciudad"
      },

      promedioCalificacion: {
        $avg: "$calificacion"
      },

      totalResenas: {
        $sum: 1
      }
    }
  },

  {
    $sort: {
      promedioCalificacion: -1,
      totalResenas: -1
    }
  },

  {
    $limit: 10
  }

]);


// =====================================================
// RFC2
// Evolución reputación hotel
// =====================================================

db.resenas.aggregate([

  {
    $match: {
      idHotel: 1,
      estado: "publicada"
    }
  },

  {
    $group: {

      _id: {
        anio: {
          $year: "$fechaCreacion"
        },

        mes: {
          $month: "$fechaCreacion"
        }
      },

      promedioMensual: {
        $avg: "$calificacion"
      },

      totalResenas: {
        $sum: 1
      }
    }
  },

  {
    $sort: {
      "_id.anio": 1,
      "_id.mes": 1
    }
  }

]);


// =====================================================
// RFC3
// Comparación hoteles por ciudad
// =====================================================

db.resenas.aggregate([

  {
    $match: {
      estado: "publicada",
      "hotel.ciudad": "Bogotá"
    }
  },

  {
    $group: {

      _id: "$idHotel",

      nombreHotel: {
        $first: "$hotel.nombre"
      },

      ciudad: {
        $first: "$hotel.ciudad"
      },

      promedioCalificacion: {
        $avg: "$calificacion"
      },

      totalResenas: {
        $sum: 1
      },

      totalConRespuesta: {
        $sum: {
          $cond: [
            {
              $ne: [
                "$respuestaAdministrador",
                null
              ]
            },
            1,
            0
          ]
        }
      },

      totalDestacadas: {
        $sum: {
          $cond: [
            {
              $eq: [
                "$destacada",
                true
              ]
            },
            1,
            0
          ]
        }
      }
    }
  },

  {
    $addFields: {

      porcentajeConRespuesta: {
        $multiply: [
          {
            $divide: [
              "$totalConRespuesta",
              "$totalResenas"
            ]
          },
          100
        ]
      },

      porcentajeDestacadas: {
        $multiply: [
          {
            $divide: [
              "$totalDestacadas",
              "$totalResenas"
            ]
          },
          100
        ]
      }
    }
  },

  {
    $sort: {
      promedioCalificacion: -1
    }
  }

]);