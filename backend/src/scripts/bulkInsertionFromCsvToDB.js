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
    console.log("data-->", data.length, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8])
    let disasterTypes = data[7].split(",")
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
      unit: data[5],
      value: Number(data[6]),
      disasterType: disasterTypeArr,
      yearlyValue: Number(data[8]),
      endMonth: data[9],
      endYear: Number(data[10])
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