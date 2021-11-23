exports.requireLogin = (req, res, next) => {
    if(req.session && req.session.user) {
        return next();
    }
    else {
        // console.log(req.session);
        return res.redirect('/login');
    }
}