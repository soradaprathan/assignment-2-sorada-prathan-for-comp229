//require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: '',
            trim: true,
            require: 'username is required'
        },
        /*
        password:
        {
            type: String,
            default: '',
            trim: true,
            required: 'password is required'
        }
        */
       email:
       {
            type: String,
            default: '',
            trim: true,
            require: 'email address is required'
       },
       displayName:
       {
            type: String,
            default: '',
            trim: true,
            require: 'Display Name  is required'
       },
       created:
       {
            type: Date,
            default: Date.now
       },
       update:
       {
            type: Date,
            default: Date.now
       }
    },
    {
        collection: "users"
    }
);

// Configure options for User Model
let options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);