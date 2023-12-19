const User = require('../user/model')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config')
const {getToken} = require('../../utills')

const register = async(req, res, next) => {
    try {
        const payload = req.body
        let user = new User(payload)
        await user.save()
        return res.json(user)

    } catch (err) {
        if(err && err.name === 'ValidatorError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        
        next(err)
    }
}


const localStrategy = async (email, password, done) => {
    try {
        let user = await User.findOne({email}).select('-__v -createdAt -updatedAt -cart_item -token')
        if(!user) return done()
        if(bcrypt.compareSync(password, user.password)) {
            ({password, ...userwithoutPassword} = user.toJSON())
            return done(null, userwithoutPassword)
        }
        
    } catch (err) {
        done(err, null)
    }
    done()

}


const login = (req, res, next) => {
    passport.authenticate('local', async function(err, user) {
        if(err) return next(err)

        if(!user) return res.json({
            error: 1,
            message: 'Email or Password incorrect'
        })

        let signed = jwt.sign(user, config.secretKey)

        await User.findByIdAndUpdate(user._id, {$push: {token: signed}})

        res.json({
            message: 'Login Successfully',
            user,
            token: signed
        })
    }) (req, res, next)


}

const logout = (req, res, next) =>  {
    let token = getToken(req)
    let user = User.findOne({token: {$In: [token]}}, {$pull: {token: token}}, {useFindAndModify: false} )

    if(!token || !user) {
        res.json({
            error: 1,
            message: 'No User Found!!'
        })
    }
    return res.json({
        error: 0,
        message: 'Logout Berhasil'
    })
}

const me = (req, res, next) => {
    if(!req.user) {
        res.json({
            err: 1,
            message: `You're not login or token expired`

        })
    }
    res.json(req.user)

}



module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me

}