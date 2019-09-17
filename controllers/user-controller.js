const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const User = sequelize.import("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");


// SIGN UP
router.post("/create", function (req, res) {
    let username = req.body.user.username;
    let firstName = req.body.user.firstName;
    let lastName = req.body.user.lastName;
    let email = req.body.user.email;
    let password = bcrypt.hashSync(req.body.user.password, 10)

    User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24})
            res.json({
                user: user,
                message: `Successfully created new user: ${user.username}.`,
                sessionToken: token
            });
        },
        createError = (err) => res.send(500, err)
    );
});

// SIGN IN
router.post("/signin", (req, res) => {
    User.findOne({
        where: {
            email: req.body.user.email
        },
    })
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
                    res.json({
                        username: `${user.username}`,
                        message: `Succesfully authenticated ${user.username}.`,
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ Error: "Bad gateway." })
                }
            })
        } else {
            res.status(500).send({ Error: "Failed to authenticate." })
        }   
    }, err => res.status(501).send({ Error: "Failed to process." }))
})

// UPDATE USER INFORMATION
router.put("/update/:id", validateSession, (req, res) => {
        User.update(req.body.user, {
            where:
            { id: req.params.id }
        })
        .then(user => res.status(200).json(
            { message: `User information successfully updated.` }
        ))
        .catch(err => res.json(req.errors))
})

// DELETE USER INFORMATION
router.delete("/delete/:id", validateSession, (req, res) => {
        User.destroy({
            where:
            { id: req.params.id }
        })
        .then(user => res.status(200).json({
            message: `User successfully deleted.`
        }))
        .catch(err => res.json(req.errors))
})

// SEARCH USER BY USERNAME
router.get("/search_username/:username", (req, res) => {
    User.findAll({ where: { username: req.params.username } })
    .then(users => res.status(200).json(users))
    .catch(err => res.json(req.errors))
})

// SEARCH USER BY FIRST NAME
router.get("/search_name/:name", (req, res) => {
    User.findAll({ where: { firstName: req.params.name } })
    .then(users => res.status(200).json(users))
    .catch(err => res.json(req.errors))
})

// SEARCH USER BY EMAIL
router.get("/search_email/:email", (req, res) => {
    User.findAll({ where : { email: req.params.email } })
    .then(users => res.status(200).json(users))
    .catch(err => res.json(req.errors))
})

module.exports = router;