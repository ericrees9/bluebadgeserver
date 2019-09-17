module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: { 
                args: true, 
                msg: "Please enter a valid email format."
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     len: { 
            //         args: [5, 24],
            //         msg: "Password must be between 5 and 24 characters long."
            //     },
            //     is: { 
            //         args: ["^(?=.*[0-9])"], 
            //         msg: "Password must contain at least one number."
            //     },
            // }   
        }    
    })
    return User;
}