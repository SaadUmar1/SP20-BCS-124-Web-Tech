function admin(req, res) {
    if (req.user.role != "admin")
        return res.status(403).send("You are not authorized"); 
    next();
}
module.exports = admin;