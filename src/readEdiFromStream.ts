import {Stream} from "stream";

import {split, writeArray} from "event-stream";
import {parseEdi} from "./parseEdi";
import {EdiRegisterSchema} from "./EdiRegisterSchema";

export async function readEdiFromStream(stream: Stream, ediRegisterSchemas: EdiRegisterSchema[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    stream
      .pipe(split())
      .pipe(parseEdi(ediRegisterSchemas))
      .pipe(writeArray((err: any, arr: any[]) => {
        resolve(arr);
      }));
  });
}
