var express = require("express");
var router = express.Router();
import {
    successResponse,
    errorResponse
} from '../modules/common'
const User = require('../models/user')

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



module.exports = router;