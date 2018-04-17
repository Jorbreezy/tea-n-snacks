var express = require("express"),
    router = express(),
    Menu = require('../model/menuSchema.js'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;
    
    
//Routes    
router.get('/', function(req, res){
    
    var p = req.body;
    var b = req.params;
    
    console.log(p);
    console.log(b);
    
    
    Menu.find({}).exec(function(err, data){
        if(err){
            console.log(err);
        }
        // console.log("Results: " + data);
        
        res.render("index", { d: data }); 
    });
    
});

router.get('/update/:id', function(req, res){
    
    var d = req.params;
    
    var id = d.id;
    
     Menu.findOne({ _id: id }).exec(function(err, data){
        if(err){
            console.log(err);
        }
        console.log("Results: " + data);
        
        res.render("update", data); 
    });
});

router.post('/update', function(req, res){
    
    var p = req.params,
        d = req.body;
    
    var id = p.id;
   
   console.log(d);
   console.log(p);
   
     Menu.findOneAndUpdate({ _id: new ObjectId(d.id), name: d.name }, { name: d.name, price: d.price, img: d.img, category:d.category }, { upsert: false }).exec(function(err, data){
        if(err){
            console.log(err);
        }
        console.log("Post Results: " + data);
        
        res.render("menu", data); 
    });
   
});


router.get('/Menu', function(req, res){
    res.render('menu');
});

router.get('/Cart', function(req, res) {
    res.render('cart');
})

router.post('/Menu', function(req, res){
    console.log("Data Being Sent");

    var k = req.body;
    
    console.log("Name: " + k.name);
    console.log("Price: " + k.price);
    console.log("Price: " + k.img);
    console.log("Price: " + k.category);
    
    
    res.send(200, { msg: "Successfully Read" });
    
    var m = new Menu({
        name: k.name,
        price: k.price,
        img: k.img,
        category: k.category
    });
    
    console.log(m);
    
    m.save(function(err){
        if(err) throw err;
        console.log('save sucessful');
    });
        
});
//API ALL DATA
router.get('/data', function(req, res){
     Menu.find().sort({ category: 1 }).exec(function(err, data){
        if(err){
            console.err(err);
        }
        res.send(data); 
    });
});


router.get('/data/:id', function(req, res){
    
    var p = req.params;
    var q = {};
    
    if(p.id != null){
        q = { 
            _id: new ObjectId(p.id)
        };
    }

     Menu.findOne(q).sort({ name: 1 }).exec(function(err, data){
        if(err){
            console.err(err);
        }
        res.send(data); 
    });
});

/*
router.get('/data/food/:id', function(req, res){
    
    var p = req.params;
    var q = {};
    
    if(p.id != null){
        q = { 
            _id: new ObjectId(p.id)
        };
    }

     Menu.findOne(q).sort({ name: 1 }).exec(function(err, data){
        if(err){
            console.err(err);
        }
        res.send(data); 
    });
});
*/

router.get('/data/category', function(req, res){
    
     Menu.find().sort({ category: 1 }).exec(function(err, data){
        if(err){
            console.err(err);
        }
        res.send(data); 
    });
});


var categories = ["", "combos", "snacks", "bubbleTea", "icetea", "greentea"];

router.get('/data/category/:category', function(req, res){
    
    var p = req.params;
    var c;
    
    
    if( isNaN(parseInt(p.category)) === false ){
        c = p.category;
    } else  if( typeof(p.category) === "string"){
        c = categories.indexOf(p.category.toLowerCase());
    } 
    
     Menu.find({ category: c }).sort({ name: 1 }).exec(function(err, data){
        if(err){
            console.err(err);
        }
        res.send(data); 
    });
});


module.exports = router;