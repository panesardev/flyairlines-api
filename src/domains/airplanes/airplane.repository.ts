import { AppDataSource } from "../../database";
import { Airplane } from "./airplane.entity";

export const AirplaneRepository = AppDataSource.getRepository(Airplane);