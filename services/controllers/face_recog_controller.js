const CONSTANTS = require("../Constants");
const processingFunctions = require("../Processing");

exports.enroll = (req, res) => {

    processingFunctions.enroll(req.body.imgUrl, req.body.subjectId, function(result){
        console.log(result);

        var resultObj = {
            "Result" : "Error."
        };

        if (result) {
            resultObj.Result = "Success";
            res.send(resultObj);
            return;
        }
        else {
            res.send(resultObj);
            return;
        }
    });

};

exports.recognize = (req, res) => {

    processingFunctions.recognize(req.body.imgUrl, CONSTANTS.galleryName, function(result){
        
        var resultObj = {
            "Result" : "Error. No learned face detected!",
            "DetectedId" : ""
        };
        
        if(result) { 
            resultObj.Result = "Success";
            resultObj.DetectedId = result;
            res.send(resultObj);
            return;
        }
        else {
            res.send(resultObj); 
            return;
        }
    });

};

exports.clear = (req, res) => {

    processingFunctions.removeGallery(CONSTANTS.galleryName, function(result){
        
        var resultObj = {
            "Result" : "Error"
        };


        if(result) {
            resultObj.Result = "Success";
            res.send(resultObj);
            return;
        }
        else {
            res.send(resultObj);
            return;
        }
    });


}