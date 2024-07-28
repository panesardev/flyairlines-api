import { DeleteResult } from "typeorm";
import { Passenger } from "./passenger.entity";
import { PassengerRepository } from './passenger.repository';

export namespace PassengerService {
  export async function findById(id: Passenger['id']): Promise<Passenger> {
    return await PassengerRepository.findOneBy({ id });
  }
  
  export async function findAll(): Promise<Passenger[]> {
    return await PassengerRepository.find();
  }

  export async function create(passenger: Passenger): Promise<Passenger> {
    return await PassengerRepository.save(passenger);
  }
  
  export async function update(passenger: Passenger): Promise<Passenger> {
    if (!passenger.id) throw Error('passenger id required');
    return await PassengerRepository.save(passenger);
  } 
  
  export async function remove(id: Passenger['id']): Promise<DeleteResult> {
    if (!id) throw Error('passPassenger id required');
    return await PassengerRepository.delete(id);
  }
}