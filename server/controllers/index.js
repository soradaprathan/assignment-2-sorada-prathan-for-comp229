/* File Name: index.js
   Name: Sorada Prathan
   Student ID: 301270677
   Date: February 18, 2023
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// Create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutMePage = (req, res, next) => {
    res.render('index', { title: 'About Me', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayServicePage = (req, res, next) => {
    res.render('index', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactMePage = (req, res, next) => {
    res.render('index', { title: 'Contact Me', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    // Check if the user is already logged in 
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server error?
        if(err)
        {
            return next(err);
        }
        // Is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // Server Error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

// set up a route for register page

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in 
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // Instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting new User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            });
        }
        else
        {
            // If no error exists, then registration is successful
            // Redirect the user and authenticate them

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list');
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Successful logout");
        }
      });
    res.redirect('/');
}
