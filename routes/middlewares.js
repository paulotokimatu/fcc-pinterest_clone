module.exports = {
    //middleware to check if user is logged in
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/");
        }
    },
    //isCorrectUser
};