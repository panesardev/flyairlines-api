import { AppDataSource } from "../../database";
import { Destination } from "./destination.entity";

export const DestinationRepository = AppDataSource.getRepository(Destination);