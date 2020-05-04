import bcrypt from 'bcrypt'
import emailCheck from '../helpers/is-email-address'
import phoneCheck from '../helpers/is-mobile-number'
import passwordCheck from '../helpers/is-password-check'

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              notEmpty: true,
              len: [1, 100]
            }
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
              len: [1, 100]
            }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
            isEmail: true
          },
          set(val) {
            this.setDataValue('email', val.toLowerCase());
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [8, 128]
          }
        },
        phone: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        can_bet: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        },
        {
            underscored: true,
            freezeTableName: true
        });

    User.associate = (models) => {
        User.hasMany(models.Booking1, {
            foreignKey: 'userId',
            as: 'bookingBy',
        }),
        User.hasMany(models.Booking2, {
            foreignKey: 'userId',
            as: 'bookingBy',
        }),
        User.hasMany(models.Booking3, {
            foreignKey: 'userId',
            as: 'bookingBy',
        }),
        User.hasMany(models.BetHistory, {
            foreignKey: 'userId',
            as: 'bookingBy',
        }),
        User.hasOne(models.MoneyChart, {
            foreignKey: 'userId',
            as: 'userMoney',
        });
    };

    User.checkData = async (username, email, password, phone) => {
        const user = await User.findOne({
            where: {
                username: username,
            }
        })
        if (user)
            throw new Error(`User exists`)

        if (!emailCheck(email)) {
            throw new Error(`Wrong mail`)
        }

        if(!phoneCheck(phone)) {
            throw new Error(`Wrong Number`)
        }

        if(passwordCheck(password)) {
            throw new Error(`Check password`)
        }

    }

    User.beforeCreate = async function(user) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
    }
    
    // User.prototype.validPassword = async function(password) {
    //     return await bcrypt.compareSync(password, this.password);
    // }


    User.authUsingUsername = async (username, password) => {
        const user = await User.findOne({
            where: {
                username: username,
            }
        })
        if (!user) 
            throw new Error(`User doesn't exist `)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) 
            throw new Error('Wrong username or password')
        return user
    }

    User.authUsingMail = async (email, password) => {
        const user = await User.findOne({
            where: {
                email: email,
            }
        })
        if (!user) 
            throw new Error(`User doesn't exist `)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) 
            throw new Error('Wrong email or password')
        return user
    }

    // otp
    User.authUsingPhone = async (phone, password) => {
        const user = await User.findOne({
            where: {
                phone: phone,
            }
        })
        if (!user) 
            throw new Error(`User doesn't exist `)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) 
            throw new Error('Wrong username or password')
        return user
    }
    
    User.adminAuth = async (username, password) => {
        const user = await User.findOne({
            where: {
                username: username,
                is_admin: true,
            }
        })
        if (!user) 
            throw new Error(`User doesn't exist `)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) 
            throw new Error('Wrong username or password')
        return user
    }

    return User;
};