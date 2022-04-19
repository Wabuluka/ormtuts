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

Country.hasOne(Capital, { onDelete: 'CASCADE'})
Capital.belongsTo(Country, { onDelete: 'CASCADE'})

let country, capital;

sequelize.sync({ alter: true})
// .then(()=>{
//     return Country.findOne({ where: { countryName: 'Rwanda'}})
// }).then((data)=>{
//     country = data;
//     return Capital.findOne({ where: { capitalName: 'Kigali'}})
// }).then((data)=>{
//     capital = data
//     return capital.setCountry(country)
// }).then((data)=>{
//     console.log(data.toJSON())
// }) 0784586803 - 0750156316 1011100229826
.then(()=>{
    return Country.destroy({ where: { countryName: 'Rwanda'}})
}).then(()=>{
    console.log('done')
})
.catch((err)=>{
    console.error(`Not created`, err)
})