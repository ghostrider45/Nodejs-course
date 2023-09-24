var fs = require("node:fs");

var products = ["Choclate","gift","music","cards"];

function product_generator() {
    fs.readFile("day2/data/products.json", "utf-8", function(error, fileData) {
        if (error) {
            console.log("Error", error);
        } else {
            var tempdata = JSON.parse(fileData);
            var tempproduct = products[Math.round(Math.random() * (products.length - 1))];
            var data = {
                "id": id+1,
                "title": tempproduct,
                "fileurl": tempproduct + ".jpg",
                "cost": 56
            };

            tempdata.products.push(data);

            fs.writeFile("day2/data/products.json", JSON.stringify(tempdata), "utf-8", function(error) {
                if (error) {
                    console.log("Error", error);
                } else {
                    console.log("File updated");
                }
            });
        }
    });
}

setInterval(product_generator, 2000);
