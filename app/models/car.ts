import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import CarBrand from './car_brand.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Rental from './rental.js'
import CarCategory from './car_category.js'
import User from './user.js'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare seats: number

  @column()
  declare mileage: number

  @column()
  declare transmission: string

  @column()
  declare fuelType: string

  @column()
  declare brandId: number

  @column()
  declare categoryId: number

  @column()
  declare ownerId: number

  @column()
  declare imageUrl: string | null

  @belongsTo(() => CarBrand, { localKey: 'id', foreignKey: 'brandId' })
  declare brand: BelongsTo<typeof CarBrand>

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'ownerId' })
  declare owner: BelongsTo<typeof User>

  @hasMany(() => Rental)
  declare rentals: HasMany<typeof Rental>

  @hasOne(() => CarCategory, { localKey: 'categoryId', foreignKey: 'id' })
  declare category: HasOne<typeof CarCategory>
}
