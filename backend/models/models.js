const sequelize= require('../db')
const {DataTypes} = require ('sequelize')

const Park = sequelize.define('Park',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    town: {type: DataTypes.STRING, allowNull: false},
    square: {type: DataTypes.FLOAT, },
    opening_time: {type: DataTypes.TIME, },
    closing_time: {type: DataTypes.TIME, },
    description: {type: DataTypes.TEXT, },
    animators: {type: DataTypes.TINYINT, },
    watersafe: {type: DataTypes.TINYINT, },
    zoo: {type: DataTypes.TINYINT, },
    cafe: {type: DataTypes.INTEGER, },
    shops: {type: DataTypes.INTEGER, },
    adress: {type: DataTypes.STRING, },
})

const Attraction = sequelize.define('Attraction',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    hight: {type: DataTypes.INTEGER, },
    weight_limitation: {type: DataTypes.INTEGER, },
    hight_limitation: {type: DataTypes.INTEGER, },
    description: {type: DataTypes.TEXT, },
    age_limitation: {type: DataTypes.INTEGER, allowNull: false},
    max_quantity_people: {type: DataTypes.INTEGER, },
    active: {type: DataTypes.TINYINT, },
})

const GreenZone = sequelize.define('GreenZone',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, },
})
const Tarif = sequelize.define('Tarif',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING,allowNull: false },
    cost: {type: DataTypes.FLOAT, allowNull: false},
    description: {type: DataTypes.TEXT, },
})
const TarifHasAttraction = sequelize.define('Tarif_has_Attraction',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const Customer = sequelize.define('Customer',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone_number: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING,  unique: true, allowNull: false},
})
const Ticket = sequelize.define('Tickets',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER, allowNull: false},
    surname: {type: DataTypes.STRING,   allowNull: false},
    name: {type: DataTypes.STRING,allowNull: false },
    date: {type: DataTypes.DATE,allowNull: false},
    active: {type: DataTypes.TINYINT, allowNull: false, defaultValue: true},
})
const Stuff = sequelize.define('Stuff',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.INTEGER,unique: true, allowNull: false },
    password: {type: DataTypes.STRING,  allowNull: false },
})
const Admin = sequelize.define('Admin',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

Park.hasMany(Attraction, {as: "attractions"});
Attraction.belongsTo(Park)

Park.hasMany(GreenZone)
GreenZone.belongsTo(Park)

Park.belongsToMany (Stuff,  {through: Admin})
Stuff.belongsToMany (Park, {through: Admin})

Attraction.belongsToMany (Tarif,  {through: TarifHasAttraction})
Tarif.belongsToMany (Attraction, {through: TarifHasAttraction})

Tarif.hasMany(Ticket)
Ticket.belongsTo(Tarif)

Customer.hasMany(Ticket)
Ticket.belongsTo(Customer)

module.exports = {
Park, Attraction, GreenZone, Tarif, TarifHasAttraction, Customer,Ticket, Stuff, Admin
}