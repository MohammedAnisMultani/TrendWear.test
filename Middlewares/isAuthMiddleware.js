const isAuth = (req,res,next) => {
    if(req.session.isAuth){
        next()
    }
    else{
        return res.status(401).json("Session Expired, Please login again")
    }
}

module.exports = isAuth;