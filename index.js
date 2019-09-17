// .ENV Linking
require("dotenv").config();

// Express Linking
let express = require("express");
let app = express();
// let multer = require("multer");

app.use(express.json());
app.use(require("./middleware/headers"));
//app.use(require("./middleware/multer-config"))

// Controller linking
let user = require("./controllers/user-controller");
let concert = require("./controllers/concert-controller");
let file = require("./controllers/file-controller");

// Database linking
let sequelize = require("./db");

/******************
 * EXPOSED ROUTES
*******************/

app.use("/user", user);


/******************
 * PROTECTED ROUTES
*******************/

app.use(require("./middleware/validate-session"));
app.use("/concert", concert);
app.use("/fileupload", file);

// Connecting to PGAdmin
sequelize.sync(); // {force: true} for resetting tables

// Listening Message
app.listen(process.env.PORT, function(){
    console.log(`App is listening on port ${process.env.PORT}!`)
});