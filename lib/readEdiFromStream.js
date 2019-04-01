"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_stream_1 = require("event-stream");
const parseEdi_1 = require("./parseEdi");
function readEdiFromStream(stream, ediRegisterSchemas) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            stream
                .pipe(event_stream_1.split())
                .pipe(parseEdi_1.parseEdi(ediRegisterSchemas))
                .pipe(event_stream_1.writeArray((err, arr) => {
                resolve(arr);
            }));
        });
    });
}
exports.readEdiFromStream = readEdiFromStream;
//# sourceMappingURL=readEdiFromStream.js.map