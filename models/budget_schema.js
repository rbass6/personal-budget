const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    validate: {
      validator: function(hexColor) {
        // String must be #XXXXXX
        return (hexColor.length === 7 && hexColor.charAt(0) === '#')
      }
    }
  }
}, {collection: 'budget-data'})

module.exports = mongoose.model('budgetModel', budgetSchema)