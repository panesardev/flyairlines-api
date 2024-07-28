import { Booking } from "./booking.entity";
import { BookingRepository } from './booking.repository';

export namespace BookingService {
  export async function findById(id: Booking['id']): Promise<Booking> {
    return await BookingRepository.findOneBy({ id });
  }
  
  export async function findAll(): Promise<Booking[]> {
    return await BookingRepository.find();
  }

  export async function create(booking: Booking): Promise<Booking> {
    return await BookingRepository.save(booking);
  }
  
  export async function update(booking: Booking): Promise<Booking> {
    if (!booking.id) throw Error('booking id required');
    return await BookingRepository.save(booking);
  } 
  
  export async function remove(booking: Booking): Promise<Booking> {
    if (!booking.id) throw Error('booking id required');
    return await BookingRepository.remove(booking);
  } 
}