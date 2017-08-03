var db = require("../controllers/db_handler.js");
var passportTwitter = require('../auth/twitter');
var mw = require("./middlewares.js");
var axios = require("axios");

function routes(app) {
    app.route("/").get((req, res) => {
        res.sendFile(process.cwd() + "/index.html");
    });
    
    app.route('/auth/twitter').get(passportTwitter.authenticate('twitter'), (req, res) => {
        res.redirect("/");
    });

    app.route('/auth/twitter/callback').get(passportTwitter.authenticate('twitter', { failureRedirect: '/error' }), (req, res) => {
        res.redirect('/');
    });

    app.route("/auth/logout").get((req, res) => {
        req.logout();
        res.redirect('/');
    });
    
    app.route("/api").get((req, res) => {
        console.log(req.session);
        if(req.session.passport && req.session.passport.user) {
            console.log("ok");
        }
        res.render("index", {currentUser: req.user});
    });
    
    app.route("/api/check-user").get((req, res) => {
        res.send(req.user);
    });
    
    app.route("/api/add-image").get((req, res) => {
        res.render("add-image", {currentUser: req.user});
    });

    
    app.route("/api/image").post(mw.isLoggedIn, (req, res) => {
        //First check if the image is valid, if not, change the url to a placeholder image
        var placeholderImage = "http://media.moddb.com/images/members/1/123/122021/profile/c9lzmv4d3mgzpnyntz7s.jpg";
        
        //Preciso arruamr essa duplicacao
        axios.get(req.body.imageUrl)
            .then(() => {
                db("images").insert({
                    url: req.body.imageUrl,
                    owner: req.user.twitter_id,
                    title: req.body.imageTitle,
                    creation_date: new Date().toISOString()
                })
                .then(() => {
                    res.redirect("/");
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch(() => {
                db("images").insert({
                    url: placeholderImage,
                    owner: req.user.twitter_id,
                    title: req.body.imageTitle,
                    creation_date: new Date().toISOString()
                })
                .then(() => {
                    res.redirect("/");
                })
                .catch((err) => {
                    console.log(err);
                });
            });
    });

    app.route("/api/all").get((req, res) => {
        db.from('images')
        .leftJoin('likes', 'images.img_id', 'likes.img_id')
        .leftJoin("users", "images.owner", "users.twitter_id")
        .count('user as likes').select([
            "url",
            "title",
            "owner",
            "images.img_id as id",
            "users.name as name"
        ])
        .groupBy('images.img_id')
        .then((data) => {
            res.send(data);
        });
    });
    
    app.route("/api/profile/:id").get((req, res) => {
        db.from('images').where("owner", req.params.id)
        .leftJoin('likes', 'images.img_id', 'likes.img_id')
        .leftJoin("users", "images.owner", "users.twitter_id")
        .count('user as likes').select([
            "url",
            "title",
            "owner",
            "images.img_id as id",
            "users.name as name"
        ])
        .groupBy('images.img_id')
        .then((data) => {
            res.send(data);
        });
    });
    
    app.route("/api/images/:id").delete(mw.isLoggedIn, (req, res) => {
        db("images").where({
                img_id: req.params.id,
                owner: req.user.twitter_id
            }).del()
            .then(() => {
                db("likes").where({
                        img_id: req.params.id,
                        user: req.user.twitter_id
                    }).del()
                    .then(() => {
                        return res.send("success");
                    });
            });
    });
    
    
    app.route("/api/like").post(mw.isLoggedIn, (req, res) => {
        //primeiro checar se existe, se nao existir, inserir
        db("likes").where({
            img_id: req.body.imageId,
            user: req.user.twitter_id
        }).select("*")
        .then((rows) => {
            if (rows.length == 0) {
                db("likes").insert({
                    img_id: req.body.imageId,
                    user: req.user.twitter_id
                }).then(res.send("inc"));
            }
            //If the user already liked, then the action is to remove his like
            else {
                db("likes")
                .where({
                    img_id: req.body.imageId,
                    user: req.user.twitter_id
                }).del()
                .then(res.send("dec"));
            }
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

module.exports = routes;