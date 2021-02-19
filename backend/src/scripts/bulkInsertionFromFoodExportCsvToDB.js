const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");


let arguments = process.argv.slice(2);
console.log(arguments.length, arguments[0], arguments[1])
let url = "mongodb+srv://admin:cmpe295dbpassword@development-database.ifuhy.mongodb.net/";
let stream = fs.createReadStream(`datasets/${arguments[0]}`);
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    console.log("data-->", data.length, data[0], data[1], data[2], data[3], data[4])
    
    csvData.push({
      state: data[0],
      commodity: data[1],
      continent: data[2],
      year: Number(data[3]),
      value: Number(data[4].replace(/,/g, ''))
    });
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

        client
          .db("cmpe295")
          .collection("analyzedfoodexportdatas") // change collection name according to your need, use mongodb collection name
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);