module.exports = (sequelize, DataTypes) => {
    const Concert = sequelize.define("concert", {
        user_id: {
            type: DataTypes.UUID,
        },
        concert_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        stateLocation: {
            type: DataTypes.STRING,
        },
        cityLocation: {
            type: DataTypes.STRING,
        },
        venue: {
            type: DataTypes.STRING,
        },
        mainPerformer: {
            type: DataTypes.STRING,
        },
        openingPerformer: {
            type: DataTypes.STRING,
        },
        tourName: {
            type: DataTypes.STRING,
        },
        lengthOfShow: {
            type: DataTypes.INTEGER,
        },
        seatInformation: {
            type: DataTypes.STRING,
        },
        setList: {
            type: DataTypes.STRING,
        },
        photos: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        }
    })
    return Concert;
}