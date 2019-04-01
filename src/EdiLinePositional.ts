import moment from "moment";

import {EdiColumnSchema} from "./EdiColumnSchema";
import {EdiFieldType} from "./EdiFieldType";

export class EdiLinePositional {
  constructor(public line: string) {}

  public read(column: EdiColumnSchema) {
    if (column.type === EdiFieldType.date) {
      return this.readDate(column.startPosition, column.endPosition, column.dateFormat);
    } else if (column.type === EdiFieldType.datetime) {
      return this.readDateTime(column.startPosition, column.endPosition, column.timeStartPosition, column.timeEndPosition, column.dateFormat);
    } else if (column.type === EdiFieldType.float) {
      return this.readFloat(column.startPosition, column.endPosition, column.decimals);
    } else if (column.type === EdiFieldType.floatSigned) {
      return this.readFloatSigned(column.startPosition, column.endPosition, column.decimals, column.signPosition);
    } else if (column.type === EdiFieldType.integer) {
      return this.readInt(column.startPosition, column.endPosition);
    } else {
      return this.readString(column.startPosition, column.endPosition);
    }
  }

  public readDate(startPosition: number, endPosition: number, dateFormat: string): Date {
    const dateStr = this.readString(startPosition, endPosition);
    return dateStr ? moment(dateStr, dateFormat).toDate() : undefined;
  }

  public readDateTime(datePos: number, dateLength: number, timePos: number, timeLength: number, dateFormat: string): Date {
    const dateStr = this.readString(datePos, dateLength);
    const timeStr = this.readString(timePos, timeLength);
    const dateTimeStr = dateStr + timeStr;
    return moment(dateTimeStr, dateFormat).toDate();
  }

  public readInt(startPosition: number, endPosition: number): number {
    const str = this.readString(startPosition, endPosition);
    const num = parseInt(str, 10);
    return isNaN(num) ? undefined : num;
  }

  public readFloat(startPosition: number, endPosition: number, decimals: number): number {
    const intPart = this.readString(startPosition, endPosition - decimals, false);
    const decimalPart = this.readString(startPosition + intPart.length, endPosition, false);
    return parseFloat(`${intPart}.${decimalPart}`);
  }

  public readFloatSigned(startPosition: number, endPosition: number, decimals: number, signPosition: number): number {
    const sign = this.readString(signPosition, signPosition);
    return this.readFloat(startPosition, endPosition, decimals) * (sign === "-" ? -1 : 1);
  }

  public readString(startPosition: number, endPosition: number, rejectSameChars: boolean = true): string {
    const str = this.line.substring(startPosition - 1, endPosition).trim();
    return rejectSameChars && EdiLinePositional.checkIfAllCharactersAreSame(str) ? undefined : str;
  }

  public static checkIfAllCharactersAreSame(str: string): boolean {
    return /^(.)\1+$/.test(str);
  }
}
