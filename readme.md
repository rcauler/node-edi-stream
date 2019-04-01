# Edi Stream

##Usage

Using with pipe:
```
import {writeArray, parseEdi, split} from "edi-stream";

const stream = fs.createReadStream(path.resolve("./sample.edi"), {encoding: "utf8"});

stream.pipe(split()).pipe(parseEdi([
  {
    id: 0,
    columns: [
      {name: "date", type: EdiFieldType.date, startPosition: 2, endPosition: 7, dateFormat: "YYMMDD"},
      {name: "n", type: EdiFieldType.integer, startPosition: 8, endPosition: 12},
      {name: "desc", type: EdiFieldType.string, startPosition: 13, endPosition: 26},
      {name: "qty", type: EdiFieldType.integer, startPosition: 27, endPosition: 28},
    ]
  },
  {
    id: 1,
    columns: [
      {name: "desc", type: EdiFieldType.string, startPosition: 2, endPosition: 12},
      {name: "value", type: EdiFieldType.floatSigned, startPosition: 14, endPosition: 20, decimals: 2, signPosition: 13},
      {name: "currency", type: EdiFieldType.string, startPosition: 21, endPosition: 23},
    ]
  },
])).pipe(writeArray((err: any, arr: any[]) => {
  console.log(arr);
}));
```

Using as Promise:
```
import {readEdiFromStream} from "edi-stream";

const stream = fs.createReadStream(path.resolve("./test/sample.edi"), {encoding: "utf8"});
const result = await readEdiFromStream(stream, [
  {
    id: 0,
    columns: [
      {name: "date", type: EdiFieldType.date, startPosition: 2, endPosition: 7, dateFormat: "YYMMDD"},
      {name: "n", type: EdiFieldType.integer, startPosition: 8, endPosition: 12},
      {name: "desc", type: EdiFieldType.string, startPosition: 13, endPosition: 26},
      {name: "qty", type: EdiFieldType.integer, startPosition: 27, endPosition: 28},
    ]
  },
  {
    id: 1,
    columns: [
      {name: "desc", type: EdiFieldType.string, startPosition: 2, endPosition: 12},
      {name: "value", type: EdiFieldType.floatSigned, startPosition: 14, endPosition: 20, decimals: 2, signPosition: 13},
      {name: "currency", type: EdiFieldType.string, startPosition: 21, endPosition: 23},
    ]
  },
]);

console.log(result);
```
