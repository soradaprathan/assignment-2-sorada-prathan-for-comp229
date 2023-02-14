let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String,

},
{   
    //this is a table's name
    collection: "contacts"
});

// Export the model
module.exports = mongoose.model('Contact', contactModel);

