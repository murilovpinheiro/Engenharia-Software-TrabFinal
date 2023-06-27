const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connsequelize');

class Muscular_Group extends Model {}
Muscular_Group.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false,              
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            sequelize,
            modelName: "Muscular_Group",
            tableName: "MUSCULAR_GROUP",
            timestamps: false,
            logging:false
        }
);

module.exports = {Muscular_Group, sequelize};