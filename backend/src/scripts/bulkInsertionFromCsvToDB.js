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
    let disasterTypes = data[8].split(",")
    let disasterTypeArr = [];
    if(disasterTypes.length >= 1 && disasterTypes[0].length >= 1) {
        disasterTypeArr = disasterTypes
    }
    csvData.push({
      year: Number(data[0]),
      month: data[1],
      state: data[2],
      category: data[3],
      commodity: data[4],
      dataItem: data[5],
      unit: data[6],
      value: data[7],
      disasterType: disasterTypeArr
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
          .collection("analyzedfoodproductiondatas") // change database name according to your need, use mongodb database name
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);