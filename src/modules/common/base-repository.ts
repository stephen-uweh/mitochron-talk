/* istanbul ignore file */
import { Injectable, mixin, Type } from '@nestjs/common'
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose'

@Injectable()
export class MongoRepository<
  T,
  U = Omit<T, '_id' | 'createdAt' | 'updatedAt' | 'id'>
> {
  constructor(readonly model: Model<T>) {}

  create(input: U): Promise<T> {
    return this.model.create(input)
  }

  getById(id: string): Promise<T | null> {
    // @ts-ignore
    return this.model.findById(id).exec()
  }

  getByIds(ids: string[]): Promise<T[]> {
    // @ts-ignore
    return this.model.find({ _id: { $in: ids } }).exec()
  }

  update(id: string, item: UpdateQuery<T>): Promise<T> {
    // @ts-ignore
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec()
  }

  async updateMany(
    query: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions<T> = {}
  ): Promise<void> {
    // @ts-ignore
    return this.model.updateMany(query, update, options).exec()
  }

  delete(id: string): Promise<T> {
    // @ts-ignore
    return this.model.findByIdAndDelete(id).exec()
  }

  async deleteById(id: string): Promise<boolean> {
    // @ts-ignore
    const docDeleted = await this.model.deleteOne({ _id: id }).exec()
    return docDeleted?.deletedCount === 1
  }

  async exists(filter: Partial<T>): Promise<boolean> {
    // @ts-ignore
    return this.model.exists(filter)
  }

  existsById(id: string): Promise<boolean> {
    // @ts-ignore
    return this.exists({ _id: id })
  }

  async existsIds(ids: string[]): Promise<boolean> {
    // @ts-ignore
    const count = await this.model.countDocuments({ _id: { $in: ids } }).exec()
    return count === ids.length
  }
}
