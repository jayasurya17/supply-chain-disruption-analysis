# Analysis of Disruptions in Food and Medical Supply Chains During a Pandemic

**Team members**

 1. Aswin Prasad  
 2. Farha Kauser
 3. Jayasurya Pinaki
 4. Shubhangi Yadav

**Data Source**
<http://www.fao.org/faostat/en/#home>
<https://quickstats.nass.usda.gov/>
<https://public.emdat.be/>

**Postman Link**
<https://app.getpostman.com/join-team?invite_code=9e7022b2840fb5482d8723dc2ff94a90>

**Run bulk insertion script for data from csv to mongoDB**
Place csv file into supply-chain-disruption-analysis\backend\src\scripts\datasets folder
Go to supply-chain-disruption-analysis\backend\src\scripts folder and run following command:

node bulkInsertionFromCsvToDB.js sample.csv  

sample.csv is a command line argument for the filename that needs to be used.
