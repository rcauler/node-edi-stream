"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_stream_1 = require("event-stream");
const EdiLinePositional_1 = require("./EdiLinePositional");
function parseEdi(ediRegisterSchemas) {
    return event_stream_1.map((line, cb) => {
        if (line) {
            const ediLine = new EdiLinePositional_1.EdiLinePositional(line);
            const ediRegisterId = ediLine.readInt(1, 1);
            const ediRegisterSchema = ediRegisterSchemas.find((e) => e.id === ediRegisterId);
            if (ediRegisterSchema) {
                const register = {};
                register.registerId = ediRegisterId;
                register.line = line;
                for (const column of ediRegisterSchema.columns) {
                    register[column.name] = ediLine.read(column);
                }
                cb(null, register);
            }
            else {
                cb();
            }
        }
        else {
            cb();
        }
    });
}
exports.parseEdi = parseEdi;
//# sourceMappingURL=parseEdi.js.map