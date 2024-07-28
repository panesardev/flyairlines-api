import { DeleteResult } from "typeorm";
import { Aircraft } from "./aircraft.entity";
import { AircraftRepository } from './aircraft.repository';

export namespace AircraftService {
  export async function findById(id: Aircraft['id']): Promise<Aircraft> {
    return await AircraftRepository.findOneBy({ id });
  }
  
  export async function findByModel(model: string): Promise<Aircraft> {
    return await AircraftRepository.findOneBy({ model });
  }
  
  export async function findAll(): Promise<Aircraft[]> {
    return await AircraftRepository.find();
  }

  export async function create(aircraft: Aircraft): Promise<Aircraft> {
    return await AircraftRepository.save(aircraft);
  }
  
  export async function update(aircraft: Aircraft): Promise<Aircraft> {
    if (!aircraft.id) throw Error('aircraft id required');
    return await AircraftRepository.save(aircraft);
  } 
  
  export async function remove(id: Aircraft['id']): Promise<DeleteResult> {
    if (!id) throw Error('aircraft id required');
    return await AircraftRepository.delete(id);
  }
}