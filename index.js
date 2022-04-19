const Sequelize = require('sequelize');
const Student = require('./student');
const { DataTypes } = Sequelize;
const bcrypt = require('bcrypt');
const zlib = require('zlib');


const sequelize = new Sequelize('sequelizevid', 'root', 'root123', {
    dialect: "mariadb"
})
sequelize.authenticate().then(()=> {
    console.log("Connection Successful.")
}).catch((err)=>{
    console.log("Error connecting to Database")
})
sequelize.drop()
const User = sequelize.define('user', {
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,

        get(){
            const rawValue = this.getDataValue('username');
            return rawValue.toUpperCase();
        }
    },
    password: {
        type: DataTypes.STRING,

        set(value){
            const salt =  bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt)
            this.setDataValue('password', hash) ;              
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    weblotts:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    description: {
        type: DataTypes.STRING,
        // set(value){
        //     const compressed = zlib.deflateSync(value).toString('base64');
        //     this.setDataValue('description', compressed)
        // },
        // get(){
        //     const value = this.getDataValue('description');
        //     const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        //     return uncompressed.toString();
        // }
    },
    aboutUser:{
        type: DataTypes.VIRTUAL,

        get(){
            return `${this.username} ${this.description}`
        }
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})
User.sync({alter: true}).then((data)=>{
    // return User.create(
    //     {
    //         'username': 'jerry',
    //         'password': 'jimroneee',
    //         'email':'dwab3',
    //         'description': 'sdjksdjsdjdfsj sdjdjdshds'
    // }
    // )
    return sequelize.query(`SELECT * FROM user`, {type: Sequelize.QueryTypes.SELECT})
    
}).then((data)=>{
    // data.forEach((element)=>{
    //     console.log(element)
    // })
    console.log(data)
}).catch((err)=>{
    console.log(err)
})
    
require('./student').Student
// Student.sync()