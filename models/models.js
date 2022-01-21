import onlineStore from '../db.js'
import sequelize from 'sequelize'

const DataType = sequelize.DataTypes

export const News = onlineStore.define('news', {
  id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataType.STRING},
  text: {type: DataType.STRING(3000)},
  img: {type: DataType.STRING},
})

export const User = onlineStore.define(
  'user',
  {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataType.STRING},
    adress: {type: DataType.STRING},
    ip: {type: DataType.STRING, unique: true},
    login: {type: DataType.STRING, unique: true},
    password: {type: DataType.STRING},
  },
  {timestamps: false}
)

export const Score = onlineStore.define(
  'score',
  {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataType.STRING},
    active: {type: DataType.BOOLEAN},
  },
  {timestamps: false}
)

export const Role = onlineStore.define(
  'role',
  {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataType.STRING, defaultValue: 'USER'},
  },
  {timestamps: false}
)

export const Tariffs = onlineStore.define(
  'tariffs',
  {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataType.STRING, unique: true},
    price: {type: DataType.STRING},
    connectionPrice: {type: DataType.STRING},
    speed: {type: DataType.STRING},
  },
  {timestamps: false}
)

export const AdditionalServices = onlineStore.define(
  'additionalServices',
  {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    connection: {type: DataType.STRING},
    fasterConection: {type: DataType.STRING},
    secondConnection: {type: DataType.STRING},
    tarrifDown: {type: DataType.STRING},
    dedicatedIp: {type: DataType.STRING},
    cableMetr: {type: DataType.STRING},
    specialistCall: {type: DataType.STRING},
    windows: {type: DataType.STRING},
    notWindows: {type: DataType.STRING},
    serviceRouter: {type: DataType.STRING},
    addNetworkCard: {type: DataType.STRING},
  },
  {timestamps: false}
)

Tariffs.hasMany(User)
User.belongsTo(Tariffs)

User.hasOne(Score, {onDelete: 'CASCADE'})
Score.belongsTo(User)

Role.hasMany(User)
User.belongsTo(Role)
