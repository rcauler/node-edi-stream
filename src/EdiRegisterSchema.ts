import {EdiColumnSchema} from "./EdiColumnSchema";

export interface EdiRegisterSchema {
  id: number;
  columns: EdiColumnSchema[];
}
