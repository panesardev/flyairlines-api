import { DeleteResult } from "typeorm";
import { Destination } from "./destination.entity";
import { DestinationRepository } from './destination.repository';

export namespace DestinationService {
  export async function findById(id: Destination['id']): Promise<Destination> {
    return await DestinationRepository.findOneBy({ id });
  }
  
  export async function findByCode(code: string): Promise<Destination> {
    return await DestinationRepository.findOneBy({ code });
  }
  
  export async function findAll(): Promise<Destination[]> {
    return await DestinationRepository.find();
  }

  export async function create(destination: Destination): Promise<Destination> {
    return await DestinationRepository.save(destination);
  }
  
  export async function update(destination: Destination): Promise<Destination> {
    if (!destination.id) throw Error('destination id required');
    return await DestinationRepository.save(destination);
  } 
  
  export async function remove(id: Destination['id']): Promise<DeleteResult> {
    if (!id) throw Error('destination id required');
    return await DestinationRepository.delete(id);
  }
}