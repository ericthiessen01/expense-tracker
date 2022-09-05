import createError from './error.js'
import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = req.cookies.access_token
    if(!token){
        return next(createError({ status: 401, message: 'unauthorized'}))
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return next(createError({ status: 401, message: 'invalid token'}))
        }
            req.user = decoded
            return next()
    })
}