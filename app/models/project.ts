import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Task from '#models/task'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column.date()
  declare startDate: DateTime

  @column.date()
  declare endDate: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  declare deletedAt?: DateTime | null

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  get completedPercentage() {
    if (!this.tasks) return 0

    const totalTasks = this.tasks.length
    const completedTasks = this.tasks.filter((task) => task.isCompleted).length

    if (totalTasks === 0) return 0
    return Math.round((completedTasks / totalTasks) * 100)
  }

  get hasOverdueTasks() {
    if (!this.tasks) return false

    const today = DateTime.local()
    return this.tasks.some((task) => task.endDate < today && !task.isCompleted)
  }
}
