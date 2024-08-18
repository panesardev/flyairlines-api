import { AppDataSource } from "../../database";
import { Flight } from "./flight.entity";

export const FlightRepository = AppDataSource.getRepository(Flight);
