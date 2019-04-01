import { EdiFieldType } from "./EdiFieldType";
export interface EdiColumnSchema {
    name: string;
    type: EdiFieldType;
    startPosition: number;
    endPosition: number;
    signPosition?: number;
    decimals?: number;
    timeStartPosition?: number;
    timeEndPosition?: number;
    dateFormat?: string;
}
