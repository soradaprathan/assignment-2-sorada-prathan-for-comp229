/* File Name: users.js
   Name: Sorada Prathan
   Student ID: 301270677
   Date: February 02, 2023
*/
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
