var express = require("express");
var router = express.Router();
import Relation from '../models/relation'
import User from '../models/user'

import {
    successResponse,
    errorResponse
} from '../modules/common'
//const User = require('../models/user')

router.get("/", function (req, res, next) {
    successResponse(res, "Welcome to TastyTongue")
})

router.get("/login", function (req, res, next) {
    // req.body.phone = "+9196219680060"
    // req.body.email = "jakir@gmail.com"
    // req.body.password = "12345678"

    User.findOne({
        'email': req.body.email,
        'password': req.body.password
    }, function (err, result) {
        if (err) {
            errorResponse(res, err)
        }
        successResponse(res, result)
    });
})

router.get("/join", function (req, res, next) {
    // req.body.phone = "+9196219680060"    
    // req.body.email = "jakir@gmail.com"    
    // req.body.password = "12345678"    

    var user = new User({
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password

    });
    user.save((err, result) => {
        if (err) {
            errorResponse(res, err)
        }
        successResponse(res, {
            Msg: "User Created Sucessfully",
            data: result
        })
    });
})


router.get("/relation", async function(req, res, next){

    var DataNew = await Relation.findById("5d3a260bf0abec088cdc61ba")
    console.log(DataNew)
    var Data = await Relation.findById("5d3a260bf0abec088cdc61ba").populate('relating').populate('related');
    successResponse(res, {
        Msg: "User Created Sucessfully",
        data: Data
    })
})

module.exports = router;