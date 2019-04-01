import * as chai from "chai";
import chaiDateTime = require("chai-datetime");

import fs from "fs";
import moment from "moment";
import path from "path";

import {writeArray, parseEdi, readEdiFromStream, split, EdiColumnSchema, EdiRegisterSchema} from "../src";
import {EdiFieldType} from "../src/EdiFieldType";

chai.use(chaiDateTime);

const assert = chai.assert;

describe("index", () => {
  it("readFile", (cb) => {
    const stream = fs.createReadStream(path.resolve("./test/sample.edi"), {encoding: "utf8"});
    stream.pipe(split()).pipe(parseEdi([
      {
        id: 0,
        columns: [
          {name: "date", type: EdiFieldType.date, startPosition: 2, endPosition: 7, dateFormat: "YYMMDD"} as EdiColumnSchema,
          {name: "n", type: EdiFieldType.integer, startPosition: 8, endPosition: 12} as EdiColumnSchema,
          {name: "desc", type: EdiFieldType.string, startPosition: 13, endPosition: 26} as EdiColumnSchema,
          {name: "qty", type: EdiFieldType.integer, startPosition: 27, endPosition: 28} as EdiColumnSchema,
        ]
      } as EdiRegisterSchema,
      {
        id: 1,
        columns: [
          {name: "desc", type: EdiFieldType.string, startPosition: 2, endPosition: 12} as EdiColumnSchema,
          {name: "value", type: EdiFieldType.floatSigned, startPosition: 14, endPosition: 20, decimals: 2, signPosition: 13} as EdiColumnSchema,
          {name: "currency", type: EdiFieldType.string, startPosition: 21, endPosition: 23} as EdiColumnSchema,
        ]
      } as EdiRegisterSchema,
    ])).pipe(writeArray((err: any, arr: any[]) => {
      assert.deepEqual(arr.length, 3);

      assert.equalDate(arr[0].date, moment("2019-03-31").toDate());
      assert.deepEqual(arr[0].n, 12);
      assert.deepEqual(arr[0].desc, "SampleText");
      assert.deepEqual(arr[0].qty, 87);

      assert.deepEqual(arr[1].desc, "Line1");
      assert.deepEqual(arr[1].value, 56.78);
      assert.deepEqual(arr[1].currency, "BRL");

      assert.deepEqual(arr[2].desc, "Line2");
      assert.deepEqual(arr[2].value, -2.54);
      assert.deepEqual(arr[2].currency, "BRL");
      cb();
    }));
  });

  it("readEdiFromStream", async () => {
    const stream = fs.createReadStream(path.resolve("./test/sample.edi"), {encoding: "utf8"});
    const result = await readEdiFromStream(stream, [
      {
        id: 0,
        columns: [
          {name: "date", type: EdiFieldType.date, startPosition: 2, endPosition: 7, dateFormat: "YYMMDD"} as EdiColumnSchema,
          {name: "n", type: EdiFieldType.integer, startPosition: 8, endPosition: 12} as EdiColumnSchema,
          {name: "desc", type: EdiFieldType.string, startPosition: 13, endPosition: 26} as EdiColumnSchema,
          {name: "qty", type: EdiFieldType.integer, startPosition: 27, endPosition: 28} as EdiColumnSchema,
        ]
      } as EdiRegisterSchema,
      {
        id: 1,
        columns: [
          {name: "desc", type: EdiFieldType.string, startPosition: 2, endPosition: 12} as EdiColumnSchema,
          {name: "value", type: EdiFieldType.floatSigned, startPosition: 14, endPosition: 20, decimals: 2, signPosition: 13} as EdiColumnSchema,
          {name: "currency", type: EdiFieldType.string, startPosition: 21, endPosition: 23} as EdiColumnSchema,
        ]
      } as EdiRegisterSchema,
    ]);

    assert.deepEqual(result.length, 3);

    assert.equalDate(result[0].date, moment("2019-03-31").toDate());
    assert.deepEqual(result[0].n, 12);
    assert.deepEqual(result[0].desc, "SampleText");
    assert.deepEqual(result[0].qty, 87);

    assert.deepEqual(result[1].desc, "Line1");
    assert.deepEqual(result[1].value, 56.78);
    assert.deepEqual(result[1].currency, "BRL");

    assert.deepEqual(result[2].desc, "Line2");
    assert.deepEqual(result[2].value, -2.54);
    assert.deepEqual(result[2].currency, "BRL");
  });
});
