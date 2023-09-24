var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = mongoose.model("User", new Schema({
    id: ObjectId,
    usertitle: String,
    usermail: String,
    usercity: String
}));

var url = "mongodb+srv://admin:wIzkMZ8PUQqfJbsP@cluster0.znvdhh9.mongodb.net/usersdb?retryWrites=true&w=majority";
//var url = "mongodb://127.0.0.1:27017/usersdb"; for local mongodb
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

mongoose.connect(url).then(
    function (res) {
        console.log("Db connected");
    }
).catch(
    function (err) {
        console.log(err);
    }
);

//Serve the homepage
app.get("/", function (req, res) {
    res.send();
});

//serve the records in database
app.get("/data", function (req, res) {
    User.find().then(
        function (dBres) {
            res.status(200).send(dBres);
        }
    ).catch(
        function (err) {
            console.log("Error", err);
            res.status(500).send("Error retrieving data from the database");
        }
    );
});

//create
app.post("/data", function (req, res) {
    var user = new User(req.body);
    user.save()
        .then(function (dBres) {
            res.status(200).send({ "message": dBres.usertitle + " was added Successfully" });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send("Error adding user to the database");
        });
});

//read to update
app.get("/edit/:uid", function (req, res) {
    User.findById({ _id: req.params.uid }).then(
        function (DBres) {
            res.status(200).send(DBres);
        }
    ).catch(
        function (err) {
            console.log("Error", err);
            res.status(500).send("Error retrieving user details from the database");
        }
    );
});

//update
app.post("/edit/:uid", function (req, res) {
    User.findByIdAndUpdate({ _id: req.params.uid }).then(function (user) {
        user.usertitle = req.body.usertitle;
        user.usermail = req.body.usermail;
        user.usercity = req.body.usercity;

        user.save()
            .then(function (updatedres) {
                res.status(200).send({ "message": updatedres.usertitle + " was updated" });
            })
            .catch(function (err) {
                console.log("Error", err);
                res.status(500).send("Error updating user in the database");
            });
    }).catch(function (err) {
        console.log("Error", err);
        res.status(500).send("Error finding user in the database");
    });
});

//Delete
app.get("/delete/:uid", function (req, res) {
    User.findByIdAndDelete({ _id: req.params.uid })
        .then(function (result) {
            res.status(200).send({ "message": result.usertitle + " was Deleted" });
        })
        .catch(function (err) {
            console.log("Error", err);
            res.status(500).send("Error deleting user from the database");
        });
});

app.listen(5050, 'localhost', function (error) {
    if (error) {
        console.log("Error there:", error);
    } else {
        console.log("Server is started at localhost 5050");
    }
});
