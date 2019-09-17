module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define("file", {
        concert_id: {
            type: DataTypes.UUID
        },
        fileType: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.BLOB("long")
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return File;
}
