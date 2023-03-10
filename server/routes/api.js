const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');
const jwt = require('jsonwebtoken')
const db = "mongodb://mypizzas:pizza123@anamello.ddns.net:27017/mypizzas";

mongoose.connect(db, function (err) {
    if (err) {
        console.error('Error! ' + err);
    } else {
        console.log('Connected to Mongo!');
    }
});

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'ce656850400574e9f9cffb285ee8abc0')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    req.admin = payload.admin;
    next();
}

router.post('/products', verifyToken, (req, res) => {
    if (!req.admin) {
        return res.status(401).send('Unauthorized request')
    }

    let productData = req.body;
    Product.findOne({}).sort({id:-1}).exec(function(err, item) {
        productData.id = item.id + 1;
        let product = new Product(productData);

        product.save((err, registeredProduct) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200).send({"product": registeredProduct})
            }
        })        
    });
})

router.delete('/products/:id', verifyToken, (req, res) =>{
    if (!req.admin) {
        return res.status(401).send('Unauthorized request')
    }

    Product.findOne({id: req.params.id}, function(err, doc) {
        if(!err) {
            doc.remove();
            res.status(200).send(true);
            return;
        }
        res.status(404).send('Product not found');
    });
})

router.post('/users', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ registeredUser });
        }
    })
});

router.delete('/users/:id', verifyToken, (req, res) =>{
    if (!req.admin) {
        return res.status(401).send('Unauthorized request')
    }

    User.findOne({_id: req.params.id}, function(err, doc) {
        if(!err) {
            doc.remove();
            res.status(200).send(true);
            return;
        }
        res.status(404).send('User not found');
    });
})


router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({ username: userData.username }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            if (!user) {
                res.status(401).send('Invalid Username')
            } else
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid Password')
                } else {
                    let payload = { subject: user._id, admin: user.admin }
                    let token = jwt.sign(payload, 'ce656850400574e9f9cffb285ee8abc0')
                    res.status(200).send({ token, 'admin': user.admin })
                }
        }
    })
});

router.get('/products', (req, res) => {
    Product.find({}, { "_id": 0 }, (err, products) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(products);
        }
    });
});

router.get('/users', (req, res) => {
    User.find({}, {}, (err, users) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).send(users);
        }
    });
});


module.exports = router;