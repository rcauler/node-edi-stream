"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const EdiFieldType_1 = require("./EdiFieldType");
class EdiLinePositional {
    constructor(line) {
        this.line = line;
    }
    read(column) {
        if (column.type === EdiFieldType_1.EdiFieldType.date) {
            return this.readDate(column.startPosition, column.endPosition, column.dateFormat);
        }
        else if (column.type === EdiFieldType_1.EdiFieldType.datetime) {
            return this.readDateTime(column.startPosition, column.endPosition, column.timeStartPosition, column.timeEndPosition, column.dateFormat);
        }
        else if (column.type === EdiFieldType_1.EdiFieldType.float) {
            return this.readFloat(column.startPosition, column.endPosition, column.decimals);
        }
        else if (column.type === EdiFieldType_1.EdiFieldType.floatSigned) {
            return this.readFloatSigned(column.startPosition, column.endPosition, column.decimals, column.signPosition);
        }
        else if (column.type === EdiFieldType_1.EdiFieldType.integer) {
            return this.readInt(column.startPosition, column.endPosition);
        }
        else {
            return this.readString(column.startPosition, column.endPosition);
        }
    }
    readDate(startPosition, endPosition, dateFormat) {
        const dateStr = this.readString(startPosition, endPosition);
        return dateStr ? moment_1.default(dateStr, dateFormat).toDate() : undefined;
    }
    readDateTime(datePos, dateLength, timePos, timeLength, dateFormat) {
        const dateStr = this.readString(datePos, dateLength);
        const timeStr = this.readString(timePos, timeLength);
        const dateTimeStr = dateStr + timeStr;
        return moment_1.default(dateTimeStr, dateFormat).toDate();
    }
    readInt(startPosition, endPosition) {
        const str = this.readString(startPosition, endPosition);
        const num = parseInt(str, 10);
        return isNaN(num) ? undefined : num;
    }
    readFloat(startPosition, endPosition, decimals) {
        const intPart = this.readString(startPosition, endPosition - decimals, false);
        const decimalPart = this.readString(startPosition + intPart.length, endPosition, false);
        return parseFloat(`${intPart}.${decimalPart}`);
    }
    readFloatSigned(startPosition, endPosition, decimals, signPosition) {
        const sign = this.readString(signPosition, signPosition);
        return this.readFloat(startPosition, endPosition, decimals) * (sign === "-" ? -1 : 1);
    }
    readString(startPosition, endPosition, rejectSameChars = true) {
        const str = this.line.substring(startPosition - 1, endPosition).trim();
        return rejectSameChars && EdiLinePositional.checkIfAllCharactersAreSame(str) ? undefined : str;
    }
    static checkIfAllCharactersAreSame(str) {
        return /^(.)\1+$/.test(str);
    }
}
exports.EdiLinePositional = EdiLinePositional;
//# sourceMappingURL=EdiLinePositional.js.map