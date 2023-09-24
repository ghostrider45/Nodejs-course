var express = require("express");
var mongoose = require("mongoose");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connect to MongoDB Atlas
var url =
  "mongodb+srv://admin:wIzkMZ8PUQqfJbsP@cluster0.znvdhh9.mongodb.net/todo_list?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.log("Error connecting to MongoDB Atlas:", err);
});

// Define the User model
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var listSchema = new Schema({
  id: ObjectId,
  item: String
});

var list = mongoose.model("list", listSchema);

//Serve the homepage
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'todolist.html'));
  });

//serve the records in the database
app.get("/data", function (req, res) {
    console.log("Fetching data from the database...");
    list.find().then(
        function (dBres) {
            console.log("Data fetched:", dBres);
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
    var listItem = new list(req.body);
    listItem.save()
        .then(function (dBres) {
            res.status(200).send({ "message": dBres.item + " was added Successfully" });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).send("Error adding item to the list");
        });
});

//read to update
app.get("/edit/:uid", function (req, res) {
    list.findById({ _id: req.params.uid }).then(
        function (DBres) {
            res.status(200).send(DBres);
        }
    ).catch(
        function (err) {
            console.log("Error", err);
            res.status(500).send("Error retrieving items from the list");
        }
    );
});

//update
app.post("/edit/:uid", function (req, res) {
    list.findByIdAndUpdate({ _id: req.params.uid }).then(function (listItem) {
        listItem.item = req.body.item;
        listItem.save()
            .then(function (updatedres) {
                res.status(200).send({ "message": updatedres.item + " was updated" });
            })
            .catch(function (err) {
                console.log("Error", err);
                res.status(500).send("Error updating item in the list");
            });
    }).catch(function (err) {
        console.log("Error", err);
        res.status(500).send("Error finding item in the database");
    });
});

//Delete
app.get("/delete/:uid", function (req, res) {
    list.findByIdAndDelete({ _id: req.params.uid })
        .then(function (result) {
            res.status(200).send({ "message": result.item + " was Deleted" });
        })
        .catch(function (err) {
            console.log("Error", err);
            res.status(500).send("Error deleting item from the list");
        });
});

// Start the server
app.listen(5050, function (error) {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Server is started at http://localhost:5050");
  }
});
