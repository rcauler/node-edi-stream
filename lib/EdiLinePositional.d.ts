import { EdiColumnSchema } from "./EdiColumnSchema";
export declare class EdiLinePositional {
    line: string;
    constructor(line: string);
    read(column: EdiColumnSchema): string | number | Date;
    readDate(startPosition: number, endPosition: number, dateFormat: string): Date;
    readDateTime(datePos: number, dateLength: number, timePos: number, timeLength: number, dateFormat: string): Date;
    readInt(startPosition: number, endPosition: number): number;
    readFloat(startPosition: number, endPosition: number, decimals: number): number;
    readFloatSigned(startPosition: number, endPosition: number, decimals: number, signPosition: number): number;
    readString(startPosition: number, endPosition: number, rejectSameChars?: boolean): string;
    static checkIfAllCharactersAreSame(str: string): boolean;
}
