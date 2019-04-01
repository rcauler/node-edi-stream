import {map, MapStream} from "event-stream";
import {EdiRegisterSchema} from "./EdiRegisterSchema";
import {EdiLinePositional} from "./EdiLinePositional";

export function parseEdi(ediRegisterSchemas: EdiRegisterSchema[]): MapStream {
  return map((line: string, cb: Function) => {
    if (line) {
      const ediLine = new EdiLinePositional(line);
      const ediRegisterId = ediLine.readInt(1, 1);
      const ediRegisterSchema = ediRegisterSchemas.find((e) => e.id === ediRegisterId);
      if (ediRegisterSchema) {
        const register: any = {};
        register.registerId = ediRegisterId;
        register.line = line;

        for (const column of ediRegisterSchema.columns) {
          register[column.name] = ediLine.read(column);
        }

        cb(null, register);
      } else {
        cb();
      }
    } else {
      cb();
    }
  });
}
