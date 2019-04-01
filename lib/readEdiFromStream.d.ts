/// <reference types="node" />
import { Stream } from "stream";
import { EdiRegisterSchema } from "./EdiRegisterSchema";
export declare function readEdiFromStream(stream: Stream, ediRegisterSchemas: EdiRegisterSchema[]): Promise<any[]>;
