/* File Name: contact.js
   Name: Sorada Prathan
   Student ID: 301270677
   Date: February 18, 2023
*/
let express  = require('express');
let router = express.Router();
let mongoose  = require('mongoose');

let passport = require('passport');

// This is a logic side
// connect to our Contact Model
//let Contact = require('../models/contact');

let contactController = require('../controllers/contact');
//const contact = require('../models/contact');

// Helper fucntion for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Contact List Page - READ Operation */
router.get('/', contactController.displayContactList);

/* GET Route for the displaying the Add Page - CREATE Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST Route for the processing the Add Page - CREATE Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET Route for the displaying the Edit Page - UPDATE Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST Route for the processing the Edit Page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;