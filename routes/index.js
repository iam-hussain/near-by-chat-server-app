var express = require("express");
var router = express.Router();
import Relation from '../models/relation'
import User from '../models/user'
import Chat from '../models/chat'

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

router.get("/chat", async function(req, res, next){

    var chat =  new Chat ({
        members : ["5d3acca8e429bb271ccdd169","5d3acd7e970f7a196cf315da"],
        messages : [
            {
                author : "5d3acca8e429bb271ccdd169",
                body : "My MS",
                attachment: ""
            },{
                author : "5d3acd7e970f7a196cf315da",
                body : "wewewe",
                attachment: ""
            }
        ]
    })

    chat.save((err, result) => {
        if (err) {
            errorResponse(res, err)
        }
        //var bewIII = Chat.findById(result._id)
        //console.log(bewIII)
        console.log(" === result._id== ", result._id)
        // res.json(bewIII)
        // res.end()
        // return false
        result = result.populate("members")
        successResponse(res, {
           
            Msg: "chat Created Sucessfully",
            data: result
        })
    });
    
})



module.exports = router;