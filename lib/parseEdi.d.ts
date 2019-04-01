import { MapStream } from "event-stream";
import { EdiRegisterSchema } from "./EdiRegisterSchema";
export declare function parseEdi(ediRegisterSchemas: EdiRegisterSchema[]): MapStream;
