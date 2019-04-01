import * as chai from "chai";
import chaiDateTime = require("chai-datetime");
import moment from "moment";
import sinon from "sinon";

import {EdiLinePositional} from "../src/EdiLinePositional";
import {EdiFieldType} from "../src/EdiFieldType";
import {EdiColumnSchema} from "../src";


chai.use(chaiDateTime);

const assert = chai.assert;

const sampleLine = "0104504379319031520190315201903150007520174099932-000000001270SampleText       00001234586762730000000055678737720000007155417675+0045876+000000";
const ediLinePositional = new EdiLinePositional(sampleLine);

describe("EdiLinePositional", () => {
  describe("#read", () => {
    it("date", () => {
      const spy = sinon.spy(ediLinePositional, "readDate");
      ediLinePositional.read({ type: EdiFieldType.date, startPosition: 12, endPosition: 17, dateFormat: "YYMMDD" } as EdiColumnSchema);
      assert.isTrue(spy.withArgs(12, 17, "YYMMDD").calledOnce);
      spy.restore();
    });
    it("datetime", () => {
      const spy = sinon.spy(ediLinePositional, "readDateTime");
      ediLinePositional.read({ type: EdiFieldType.datetime, startPosition: 12, endPosition: 17, timeStartPosition: 41, timeEndPosition: 44, dateFormat: "YYMMDDHHmm" } as EdiColumnSchema);
      assert.isTrue(spy.withArgs(12, 17, 41, 44, "YYMMDDHHmm").calledOnce);
      spy.restore();
    });
    it("integer", () => {
      const spy = sinon.spy(ediLinePositional, "readInt");
      ediLinePositional.read({ type: EdiFieldType.integer, startPosition: 3, endPosition: 6 } as EdiColumnSchema);
      assert.isTrue(spy.withArgs(3, 6).calledOnce);
      spy.restore();
    });
    it("float", () => {
      const spy = sinon.spy(ediLinePositional, "readFloat");
      ediLinePositional.read({ type: EdiFieldType.float, startPosition: 3, endPosition: 6, decimals: 2 } as EdiColumnSchema);
      assert.isTrue(spy.withArgs(3, 6, 2).calledOnce);
      spy.restore();
    });
    it("floatSigned", () => {
      const spy = sinon.spy(ediLinePositional, "readFloatSigned");
      ediLinePositional.read({ type: EdiFieldType.floatSigned, startPosition: 3, endPosition: 6, decimals: 2, signPosition: 50 } as EdiColumnSchema);
      assert.isTrue(spy.withArgs(3, 6, 2, 50).calledOnce);
      spy.restore();
    });
    it("string", () => {
      const spy = sinon.spy(ediLinePositional, "readString");
      ediLinePositional.read({ type: EdiFieldType.string, startPosition: 63, endPosition: 79 } as EdiColumnSchema);
      assert.isTrue(spy.withArgs(63, 79).calledOnce);
      spy.restore();
    });
  });

  it("#checkIfAllCharactersAreSame", () => {
    assert.isTrue(EdiLinePositional.checkIfAllCharactersAreSame("000000"));
    assert.isFalse(EdiLinePositional.checkIfAllCharactersAreSame("000001"));
  });

  it("#readDate", () => {
    assert.equalDate(
      ediLinePositional.readDate(12, 17, "YYMMDD"),
      moment("2019-03-15").toDate()
    );
    assert.isUndefined(ediLinePositional.readDate(114, 119, "YYMMDD"));
  });

  it("#readDateTime", () => {
    assert.equalTime(
      ediLinePositional.readDateTime(12, 17, 41, 44, "YYMMDDHHmm"),
      moment("2019-03-15 17:40").toDate()
    );
  });

  it("#readInt", () => {
    assert.deepEqual(
      ediLinePositional.readInt(1, 1),
      0
    );
    assert.deepEqual(
      ediLinePositional.readInt(3, 6),
      450
    );
    assert.isUndefined(
      ediLinePositional.readInt(74, 74),
    );
  });

  it("#readFloat", () => {
    assert.deepEqual(
      ediLinePositional.readFloat(3, 6, 2),
      4.5
    );
    assert.deepEqual(
      ediLinePositional.readFloat(118, 124, 3),
      71.554
    );
    assert.deepEqual(
      ediLinePositional.readFloat(139, 144, 2),
      0
    );
  });

  it("#readFloatSigned", () => {
    assert.deepEqual(
      ediLinePositional.readFloatSigned(51, 62, 2, 50),
      -12.70
    );
    assert.deepEqual(
      ediLinePositional.readFloatSigned(51, 62, 2, 130),
      12.70
    );
  });

  it("#readString", () => {
    assert.deepEqual(
      ediLinePositional.readString(63, 79),
      "SampleText"
    );
  });
});
