const { Sequelize,DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true, 
    },
    name: {
      type: DataTypes.STRING(20),  //maximos 20 caracteres
      allowNull: false,
      validate: {
        len: {
          args: [0, 20], //comprobacion de que si es mas corto que 20, con el mesanje de error
          msg: 'La longitud máxima para name es de 20 caracteres'
        }
      }
    },
    image: {
      type: DataTypes.STRING(200),  //maximos 200 caracteres
      allowNull: false,
      validate: {
        len: {
          args: [0, 200], //comprobacion de que si es mas corto que 200, con el mesanje de error
          msg: 'La longitud máxima de image es de 200 caracteres'
        }
      }
    },
    
    height: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      validate: {
        len: [0, 4], //solo se perimenten arrays de 2 elementos 
        max: [4,  "la altura maxima es de 4 metros"] //maximo los numeros pueden ser 4 (metros)
      }
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      validate: {
        len: [0, 120], //solo se perimenten arrays de 2 elementos 
        max: [120, "El peso maximo es de 120 kg"] //maximo los numeros pueden ser 120 (kilos)
      }
    },
    life_span: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      validate: { 
        len: [0, 18], //solo se perimenten arrays de 2 elementos 
        max: [18, "El valor máximo para life es 18 años"] //maximo los numeros pueden ser 18 (años)
      }
    },
    created: {
      type: DataTypes.TEXT,
      defaultValue: "true",
    }
  });
};

// Image: un sting de maximo 200 caracteres
// name: un sting de maximo 20 caracteres
// height: array de 2 number que no puede ser mas de 4 (metro)
// weight: array de 2 number que no puede ser mas de 120 (KG)
// life: array de 2 number que no puede ser mas de 18 (años)
