import { Destination } from "./destination.entity";
import { DestinationRepository } from "./destination.repository";

export namespace DestinationService {
  export async function findByCode(code: string): Promise<Destination> {
    return await DestinationRepository.findOneBy({ code });
  }
  
  export async function findAll(): Promise<Destination[]> {
    return await DestinationRepository.find();
  }
}
