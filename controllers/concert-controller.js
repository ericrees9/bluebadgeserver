const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const Concert = sequelize.import("../models/concert-model");
const validateSession = require("../middleware/validate-session");
//Concert.sync({force: true}); 

// POSTING NEW CONCERTS
router.post("/create", validateSession, (req, res) => {
    let user_id = req.user.user_id;
    let name = req.body.concert.name
    let date = req.body.concert.date;
    let stateLocation = req.body.concert.stateLocation;
    let cityLocation = req.body.concert.cityLocation;
    let venue = req.body.concert.venue;
    let mainPerformer = req.body.concert.mainPerformer;
    let openingPerformer = req.body.concert.openingPerformer;
    let tourName = req.body.concert.tourName;
    let lengthOfShow = req.body.concert.lengthOfShow;
    let seatInformation = req.body.concert.seatInformation;
    let setList = req.body.concert.setList;
    let notes = req.body.concert.notes;

    Concert.create({
        user_id: user_id,
        name: name,
        date: date,
        stateLocation: stateLocation,
        cityLocation: cityLocation,
        venue: venue,
        mainPerformer: mainPerformer,
        openingPerformer: openingPerformer,
        tourName: tourName,
        lengthOfShow: lengthOfShow,
        seatInformation, seatInformation,
        setList: setList,
        notes: notes,
    })
    .then(
        createSuccess = (concert) => {
            res.json({
                message: `${name} has successfully been created!`,
                id: `${user_id}`
            });
        },
        createError = (err) => res.send(500, err)
    );
});

// FINDING ALL CONCERTS BY USERID
router.get("/findmine", validateSession, (req,res) => {
    //console.log(req.user)
    
    Concert.findAll({ where: { user_id: req.user.user_id } })
        .then(concert => res.status(200).json(concert))
        .catch(err => res.status(500).json({error: err}))
})

// DELETING CONCERTS BY ID
router.delete("/delete/:id", validateSession, (req, res) => {
    Concert.destroy({ where: { id: req.params.id } })
    .then(concert => res.status(200).json({
        message: `Concert successfully deleted.`
    }))
    .catch(err => res.json(req.errors))
})

// UPDATING CONCERT INFO BY ID
router.put("/update/:id", validateSession, (req, res) => {
    Concert.update(req.body, { where: { id: req.params.id } })
    .then(concert => res.status(200).json(concert))
    .catch(err => res.json(req.errors))
})

// FINDING CONCERTS BY ID AND MAIN PERFORMER
router.get("/findmine/mainperformer/:mainperformer", validateSession, (req, res) => {
    Concert.findAll({ where: { mainPerformer: req.params } })
    .then(concert => res.status(200).json(concert))
    .catch(err => res.status(500).json(req.errors))
})

// FINDING CONCERTS BY ID AND CONCERT NAME
router.get("/findmine/concert/:name", validateSession, (req, res) => {
    Concert.findAll({ where: { name: req.params } })
    .then(concert => res.status(200).json(concert))
    .catch(err => res.status(500).json(req.errors))
})

// FINDING CONCERTS BY ID AND VENUE
router.get("/findmine/venue/:venue", validateSession, (req, res) => {
    Concert.findAll({ where: { venue: req.params } })
    .then(concert => res.status(200).json(concert))
    .catch(err => res.status(500).json(req.errors))
})

// FINDING CONCERTS BY ID AND TOUR NAME
router.get("/findmine/tourName/:tourName", validateSession, (req, res) => {
    Concert.findAll({ where: { tourName: req.params } })
    .then(concert => res.status(200).json(concert))
    .catch(err => res.status(500).json(req.errors))
})

module.exports = router;