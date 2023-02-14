let express  = require('express');
let router = express.Router();
let mongoose  = require('mongoose');

// Create a reference to the  Contacts model
let Contact = require('../models/contact');

// Display contact list operation
module.exports.displayContactList = (req, res, next) => {
    // Get all contacts sorted by Contact Name in ascending order
    Contact.find().sort({ contactName: 1 }).exec((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else 
        {
            // console.log(contactList);
            //This is an object we pushing to the view
            res.render('contact/list', 
            {title: 'Contact List', 
            ContactList: contactList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

// Display add contact operation
module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact({
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress
    });

    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Show the edit view
            res.render('contact/edit', 
            {title: 'Edit Contact', 
            contact: contactToEdit, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "contactName": req.body.contactName,
        "contactNumber": req.body.contactNumber,
        "emailAddress": req.body.emailAddress    
    });

    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
           // Refresh the contact list
           res.redirect('/contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Contact.remove({_id:id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the contact list
           res.redirect('/contact-list');
        }
    });
}