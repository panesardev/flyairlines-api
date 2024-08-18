import { DeleteResult } from "typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

export namespace UserService {
  export async function findById(id: User['id']): Promise<User> {
    const user = await UserRepository.findOneBy({ id });
    const { password, ...rest } = user;
    return rest;
  }
  
  export async function findByEmail(email: string): Promise<User> {
    return await UserRepository.findOneBy({ email });
  }

  export async function create(user: User): Promise<User> {
    return await UserRepository.save(user);
  }

  export async function update(user: User): Promise<User> {
    if (!user.id) throw Error('user id required');
    return await UserRepository.save(user);
  } 
  
  export async function remove(id: User['id']): Promise<DeleteResult> {
    if (!id) throw Error('user id required');
    return await UserRepository.delete(id);
  }
}
