import { ID } from './index';

export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: ID): Promise<T | null>,
}

export interface ICRUDModelLogin<T> {
  findUserByEmail(email: string): Promise<T | null>,
  // findUserById(id: ID): Promise<T | null>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: ID): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T> { }
