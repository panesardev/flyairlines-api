import { DeleteResult } from "typeorm";
import { Airplane } from "./airplane.entity";
import { AirplaneRepository } from './airplane.repository';

export namespace AirplaneService {
  export async function findById(id: Airplane['id']): Promise<Airplane> {
    return await AirplaneRepository.findOneBy({ id });
  }
  
  export async function findByModel(model: string): Promise<Airplane> {
    return await AirplaneRepository.findOneBy({ model });
  }
  
  export async function findAll(): Promise<Airplane[]> {
    return await AirplaneRepository.find();
  }

  export async function create(airplane: Airplane): Promise<Airplane> {
    return await AirplaneRepository.save(airplane);
  }
  
  export async function update(airplane: Airplane): Promise<Airplane> {
    if (!airplane.id) throw Error('airplane id required');
    return await AirplaneRepository.save(airplane);
  } 
  
  export async function remove(id: Airplane['id']): Promise<DeleteResult> {
    if (!id) throw Error('airplane id required');
    return await AirplaneRepository.delete(id);
  }
}