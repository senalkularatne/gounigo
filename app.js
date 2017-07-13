//******************************************************************
//                              SETUP
//******************************************************************

var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Setup mongoose and connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gounigo');

//******************************************************************
//                              Database
//******************************************************************

// Setup Schema
var saleItemSchema = new mongoose.Schema({
	name: String,
	image: String
});

// Compile Schema to Model
var SaleItem = mongoose.model("SaleItem", saleItemSchema);

// Create an item. We no longer need this code as we can add data through the app.

// SaleItem.create(
// 	{
// 		name: "Computer chair", 
// 		image:"https://images-na.ssl-images-amazon.com/images/I/61oavRu2zqL._SY550_.jpg"

// 	}, 
// 	function(err, saleitem){ 
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly created sale item");
// 			console.log(saleitem);
// 		}
// 	});

//******************************************************************
//                               ROUTES
//******************************************************************

//  1. Homepage. Click viewallitems
app.get("/", function(req, res){
	res.render("home");
});

// 2. allitems. View all items here.
app.get("/allitems", function(req, res){
	
	// Get all items from the Database and render that file
	SaleItem.find({}, function(err, allSaleItems){
		if (err){
			console.log(err);
		} else {
			res.render('allitems', {itemsForSale: allSaleItems});
		}
	});
});

// 3. Submit new item using a form and make a POST request.
app.get("/allitems/new", function(req, res){
	res.render("new");
});

// 4. Post request is made.New items are created. Then you will be redirected back to allitems
app.post("/allitems", function(req, res){

	// a) get data from forms  
	var name = req.body.name;
	var image = req.body.image;
	var newSaleItem = { name: name, image: image };

	// b) Create new sale item and save to database
	SaleItem.create(newSaleItem, function(err, newnlyCreated){

		if(err){
			console.log(err);
		} else {
			// Redirectback to saleItems page
			res.redirect("allitems");
		}
	});
});

//******************************************************************
//                          START SERVER
//******************************************************************

app.listen(3000, function() {
  console.log("GoUniGo Server is running");
});