const CONSTANTS = require("../Constants");
const processingFunctions = require("../Processing");

exports.enroll = (req, res) => {

    processingFunctions.enroll(req.body.imgUrl, req.body.subjectId, function(result){
        console.log(result);
        if (result) res.send("Enrollment successful");
        else res.send("Error occured in Enrollment");
    });

};

exports.recognize = (req, res) => {

    processingFunctions.recognize(req.body.imgUrl, CONSTANTS.galleryName, function(result){
        
        if(result) { 
            res.send("Face recognized in image belongs to " + result);
            return;
        }
        else {
            res.send("Face recognized in image does not belong in gallery"); 
            return;
        }
    });

};

exports.clear = (req, res) => {
    processingFunctions.removeGallery(CONSTANTS.galleryName, function(result){
        console.log(result);
        if(result) res.send("Gallery successfully cleared");
        else res.send("Error occured in clearing gallery");
    });


}