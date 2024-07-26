import { AppDataSource } from "../../database";
import { Passenger } from "./passenger.entity";

export const PassengerRepository = AppDataSource.getRepository(Passenger);