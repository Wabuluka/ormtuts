const Sequelize = require('sequelize')
const { DataTypes } = Sequelize;

const sequelize = new Sequelize('sequelizevid', 'root', 'root123', {
    dialect: 'mariadb'
})

const Student = sequelize.define('student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    favorite_class: {
        type: DataTypes.STRING(25),
        allowNull: false,
        defaultValue: "Computer Science"
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subscribed:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    freezeTable: true,
    timestamps: false
})

module.exports = Student