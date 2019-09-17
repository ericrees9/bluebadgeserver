const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const sequelize = require("../db");
const File = sequelize.import("../models/file-model");
const validateSession = require("../middleware/validate-session");
//File.sync({force: true}); 

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/uploads")
    },
    filename: (req, file, callback) => {
        crypto.pseudoRandomBytes(8, function(err, raw) {
            if (err) return callback(err);
            callback(null, raw.toString("hex") + path.extname(file.originalname));
        })
    }
});
let upload = multer({ storage: storage });

router.post("/single", validateSession, upload.single("file"), (req,res) => {
    console.log(req.file)
    console.log(req.user)

    File.create({
        fileType: req.file.mimetype,
        name: req.file.filename,
        data: req.file.buffer,
        owner: req.user.id,
        concertId: req.user.concertId
    }).then((file) => {
        res.json({ msg: `${req.file.originalname} uploaded successfully!` });
    }).catch(err => {
        res.status(500).json({ error: "Error in file upload." })
        console.log(err);
    });
})

router.post("/multiple", validateSession, upload.array("files", 12), (req,res) => {
    console.log(req.files)

    File.create({
        fileType: req.files.mimetype,
        name: req.files.filename,
        data: req.files.buffer,
        owner: req.user.id,
    }).then((files) => {
        res.json({ msg: `${req.files.originalname} uploaded successfully!` });
    }).catch(err => {
        res.status(500).json({ error: "Error in file upload." })
        console.log(err);
    });
})


module.exports = router;