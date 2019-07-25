var generator = require('generate-password');


var randomGenerator = function (Size) {
    return generator.generate({
        length: Size,
        uppercase: true,
        numbers: true,
        exclude: true,
        excludeSimilarCharacters: true,
    });
}

var successResponse = function (res, data){
    res.json({
        success: true,
        error: null,
        data: data
    })
    res.end();
    return false;
}

var errorResponse = function (res, msg){
    res.json({
        success: false,
        error: {
            messages: msg
        }
    })
    res.end();
    return false;
}

module.exports.randomGenerator = randomGenerator;
module.exports.successResponse = successResponse;
module.exports.errorResponse = errorResponse;