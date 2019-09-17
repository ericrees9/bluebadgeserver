const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.NAME, "postgres", process.env.PASS, {
    host: "localhost",
    dialect: "postgres"
});

sequelize.authenticate().then(
    function(){
        console.log(`Connected to ${process.env.NAME} postgres database!`);
    },
    function(err){
        console.log(err);
    }
);


// Setting up relational tables
const db = {};

db.Sequelize = Sequelize; 
db.sequelize = sequelize;

// Linking all models to this file
db.users = require('./models/user-model')(sequelize, Sequelize);
db.concerts = require("./models/concert-model")(sequelize, Sequelize);
db.files = require("./models/file-model")(sequelize, Sequelize);

// Relations between tables
db.files.belongsTo(db.concerts);
db.concerts.hasMany(db.files);
db.concerts.belongsTo(db.users);
db.users.hasMany(db.concerts);

module.exports = sequelize;