/* File Name: index.js
   Name: Sorada Prathan
   Student ID: 301270677
   Date: February 02, 2023
*/

let express = require('express');
let router = express.Router();


// Make reference to index.js in controllers folder
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about me page. */
router.get('/about', indexController.displayAboutMePage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectPage);

/* GET services page. */
router.get('/services', indexController.displayServicePage);

/* GET contact me page. */
router.get('/contact', indexController.displayContactMePage);

/* GET Route for displaying the Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login Page  */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register Page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register Page  */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
