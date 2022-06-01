const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Park = sequelize.define('Park', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  town: { type: DataTypes.STRING, allowNull: false },
  square: { type: DataTypes.FLOAT },
  opening_time: { type: DataTypes.TIME },
  closing_time: { type: DataTypes.TIME },
  description: { type: DataTypes.TEXT },
  animators: { type: DataTypes.TINYINT },
  watersafe: { type: DataTypes.TINYINT },
  zoo: { type: DataTypes.TINYINT },
  cafe: { type: DataTypes.INTEGER },
  shops: { type: DataTypes.INTEGER },
  adress: { type: DataTypes.STRING },
})

const Attraction = sequelize.define('Attraction', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  hight: { type: DataTypes.INTEGER },
  weight_limitation: { type: DataTypes.INTEGER },
  hight_limitation: { type: DataTypes.INTEGER },
  description: { type: DataTypes.TEXT },
  age_limitation: { type: DataTypes.INTEGER, allowNull: false },
  max_quantity_people: { type: DataTypes.INTEGER },
  active: { type: DataTypes.TINYINT },
})

const GreenZone = sequelize.define('GreenZone', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
})
const Tarif = sequelize.define('Tarif', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  cost: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
})
const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  phone_number: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
})
const Ticket = sequelize.define('Tickets', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  number: { type: DataTypes.INTEGER, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
})
const Stuff = sequelize.define('Stuff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'stuff' },
})
const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Park.hasMany(Attraction, { onDelete: 'cascade', onUpdate: 'no action' })

Park.hasMany(GreenZone, { onDelete: 'cascade' })
GreenZone.belongsTo(Park, {
  onDelete: 'cascade',
  onUpdate: 'no action',
  foreignKey: { allowNull: false },
  hooks: true,
})

Park.belongsToMany(Stuff, { through: Admin }, { onDelete: 'set null' })
Stuff.belongsToMany(Park, { through: Admin })

Park.hasMany(Tarif, { onDelete: 'cascade', onUpdate: 'no action' })
Tarif.belongsTo(Park, {
  onDelete: 'cascade',
  onUpdate: 'no action',
  foreignKey: { allowNull: false },
  hooks: true,
})

Tarif.hasMany(Ticket)
Ticket.belongsTo(Tarif)

Customer.hasMany(Ticket)
Ticket.belongsTo(Customer)

module.exports = {
  Park,
  Attraction,
  GreenZone,
  Tarif,
  Customer,
  Ticket,
  Stuff,
  Admin,
}
