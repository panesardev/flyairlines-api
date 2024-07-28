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
  
  export async function remove(aircraft: Aircraft): Promise<Aircraft> {
    if (!aircraft.id) throw Error('aircraft id required');
    return await AircraftRepository.remove(aircraft);
  } 
}