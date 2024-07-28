import { AppDataSource } from "../../database";
import { Aircraft } from "./aircraft.entity";

export const AircraftRepository = AppDataSource.getRepository(Aircraft);