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
    return await UserRepository.save(user);
  }
  
  export async function remove(user: User): Promise<void> {
    await UserRepository.delete(user);
  }
}
