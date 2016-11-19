const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a Schema
const dataSchema = new Schema({
  salary: Number,
  balance: Number,
  pay_date: Number,
  total_expenses: Number,
  expenses : [{
    category : String,
    description : String,
    date : String,
    cost : Number,
    image: String
     }]
},{collection: 'datas'})

//create the model
const Data = mongoose.model('Data', dataSchema)

//export model
module.exports = {Data}
