//*******************
//         SETUP
//*******************
var express = require('express');
var app = express();

// Setup body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//*******************
//       Data
//*******************

var itemsForSale = [
		{name: "Baseball bat", image:"https://www.baseballsavings.com/wcsstore/CatalogAssetStore/Attachment/images/products/baseball/P30947/cfli-jb19josebautistanaturalblack.jpg"},
		{name: "Computer chair", image:"https://images-na.ssl-images-amazon.com/images/I/61oavRu2zqL._SY550_.jpg"},
		{name: "macbook pro 2017 15 inch", image:"https://cnet2.cbsistatic.com/img/Sw8uAlM5e3g8EgNhXRMQ7ZSE3UE=/2017/06/06/e2d6362b-3883-4d9f-9df9-2a8fb6ba739a/apple-macbook-pro-touch-bar-15-inch-2017-4197.jpg"},{name: "Baseball bat", image:"https://www.baseballsavings.com/wcsstore/CatalogAssetStore/Attachment/images/products/baseball/P30947/cfli-jb19josebautistanaturalblack.jpg"},
		{name: "Computer chair", image:"https://images-na.ssl-images-amazon.com/images/I/61oavRu2zqL._SY550_.jpg"},
		{name: "macbook pro 2017 15 inch", image:"https://cnet2.cbsistatic.com/img/Sw8uAlM5e3g8EgNhXRMQ7ZSE3UE=/2017/06/06/e2d6362b-3883-4d9f-9df9-2a8fb6ba739a/apple-macbook-pro-touch-bar-15-inch-2017-4197.jpg"},{name: "Baseball bat", image:"https://www.baseballsavings.com/wcsstore/CatalogAssetStore/Attachment/images/products/baseball/P30947/cfli-jb19josebautistanaturalblack.jpg"},
		{name: "Computer chair", image:"https://images-na.ssl-images-amazon.com/images/I/61oavRu2zqL._SY550_.jpg"},
		{name: "macbook pro 2017 15 inch", image:"https://cnet2.cbsistatic.com/img/Sw8uAlM5e3g8EgNhXRMQ7ZSE3UE=/2017/06/06/e2d6362b-3883-4d9f-9df9-2a8fb6ba739a/apple-macbook-pro-touch-bar-15-inch-2017-4197.jpg"}
]

//*******************
//       ROUTES
//*******************

//  1. Homepage. Click viewallitems
app.get("/", function(req, res){
	res.render("home");
});

// 2. allitems. View all items here.
app.get("/allitems", function(req, res){
	res.render('allitems', {itemsForSale: itemsForSale});
});

// 3. Submit new item using a form and make a POST request.
app.get("/allitems/new", function(req, res){
	res.render("new");
});

// 4. Post request is made. New items are created. Then you will be redirected back to allitems
app.post("/allitems", function(req, res){

	// get data from forms and add to itemsForSale array
	var name = req.body.name;
	var image = req.body.image;
	var newItem = { name: name, image: image };
	itemsForSale.push(newItem);

	// redirect back to allitems page
	res.redirect("/allitems");

});

//*******************
//    START SERVER
//*******************
app.listen(3000, function() {
  console.log("GoUniGo Server is running");
});