import * as fs from 'fs'
import * as readline from 'readline'
import { parse } from 'fast-csv'

//console.log(__dirname);
/*
const stream = fs.createReadStream(__dirname + '/test.tsv')
      .pipe(parse({ delimiter: '\t' }));

const reader = readline.createInterface({ input: stream });

reader.on("line", (data:string) => {
    console.log(data)
});
*/
let errors = [];
let end = '';
async function foo() {

  let str = 'hey';
  //console.log(`Message: ${str}`);
  setTimeout(() => {
    console.log(`Message: ${str}`);
  }, 500);

  try {
    await fs.createReadStream(__dirname + '/test.tsv')
        .pipe(parse({ delimiter: '\t' }))
        .on('error', error => errors.push(error))
        .on('data', row => {
          //records.push(row);
          setTimeout(() => {
            //console.log(`Message: ${str}`);
            console.log('私は呼ばれた' + row[0]);
          }, 1000);
          // 行をDBへ挿入
          //this.addRow(row);
        })
        .on('end', (rowCount: number) => {
          end = `Parsed ${rowCount} rows`;
        });

  } catch (err) {
    console.log(err);
  }
}

async function bar() {
  await foo();

  let str = 'Hello'
  console.log(`Message: ${str}`);
}

bar();



/*
const res = new Promise((resolve, reject) => {
  stream
    .on('data', row => {
      //records.push(row);
      console.log('私は呼ばれた' + row[0]);
      // 行をDBへ挿入
      //this.addRow(row);
    });
  stream
    .on('error', (err) => reject(err));
  stream
    //.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    .on('end', (rowCount: number) => {
      end = `Parsed ${rowCount} rows`
      //resolve()
    });
});


console.log(res)
*/
