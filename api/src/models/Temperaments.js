const { Sequelize,DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperament', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
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
  });
};
