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
    console.log('Created')
    return Capital.findOne({ where: { capitalName: 'Kampala'}})
}).then((data)=>{
    capital = data;
    return Country.findOne({ where: { countryName: 'Uganda' }})
}).then((data)=>{
    country = data;
    country.setCapital(capital)
}).catch((err)=>{
    console.error(`Not created`, errr)
})