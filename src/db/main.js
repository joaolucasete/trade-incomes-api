const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/trade-incomes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.Promise = global.Promise

module.exports = mongoose
