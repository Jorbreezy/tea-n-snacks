var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var menuSchema = new Schema({
  name: String,
  price: Number,
  img: String,
  category: String
});

var menu = mongoose.model('teasnacks', menuSchema);

module.exports = menu;