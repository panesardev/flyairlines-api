import { DeleteResult } from "typeorm";
import { Flight } from "./flight.entity";
import { FlightRepository } from './flight.repository';

export namespace FlightService {
  export async function findById(id: Flight['id']): Promise<Flight> {
    return await FlightRepository.findOneBy({ id });
  }
  
  export async function findAll(): Promise<Flight[]> {
    return await FlightRepository.find();
  }

  export async function findByNumber(number: string): Promise<Flight> {
    return await FlightRepository.findOneBy({ number });
  }
  
  export async function create(flight: Flight): Promise<Flight> {
    return await FlightRepository.save(flight);
  }
  
  export async function update(flight: Flight): Promise<Flight> {
    if (!flight.id) throw Error('flight id required');
    return await FlightRepository.save(flight);
  } 
  
  export async function remove(id: Flight['id']): Promise<DeleteResult> {
    if (!id) throw Error('flight id required');
    return await FlightRepository.delete(id);
  }
}