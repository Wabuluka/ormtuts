const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('sequelizevid', 'root', 'root123', {
    dialect: "mariadb"
})

const Country = sequelize.define('country', {
    countryName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})


const Capital = sequelize.define('capital', {
    capitalName: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    timestamps: false
})

Country.hasOne(Capital)

let country, capital;

sequelize.sync({ alter: true})
.then(()=>{
    return Country.findOne({ where: { countryName: 'Uganda'}})
}).then((data)=>{
    country = data;
    return country.getCapital()
}).then((data)=>{
    console.log(data.toJSON())
}).catch((err)=>{
    console.error(`Not created`, errr)
})