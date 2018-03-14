const csv=require('csvtojson')
const path = require('path')
const fs = require('fs')
const csvFilePath = path.join(__dirname, 'customer-data.csv')
const jsonFilePath = path.join(__dirname,  'customer-data.json')
fs.unlinkSync(jsonFilePath)
fs.appendFileSync(jsonFilePath, '[\n')
var sep = ''
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
    fs.appendFileSync(jsonFilePath, sep + JSON.stringify(jsonObj, null, 2))
    if (!sep)
        sep = ',\n'
})
.on('done',(error)=>{
    console.log('end')
    fs.appendFileSync(jsonFilePath, '\n]')
})