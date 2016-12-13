var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = function(){
    var userSchema = new Schema ({  
        id: String,
        token: String,
        email: String,
        name: String,
  });
};