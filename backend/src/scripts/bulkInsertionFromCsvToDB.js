const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb+srv://admin:cmpe295dbpassword@development-database.ifuhy.mongodb.net/";
let stream = fs.createReadStream("datasets/processed_data.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push({
      year: data[0],
      month: data[1],
      state: data[2],
      category: data[3],
      commodity: data[4],
      dataItem: data[5],
      unit: data[6],
      value: data[7],
      disasterType: data[8]
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
          .collection("analyzedfoodproductiondatas")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

stream.pipe(csvStream);