
'use strict';

const request = require("request");
const CONSTANTS = require("./Constants");

// function list
// 1. Enroll
// 2. Recognize
// 3. Remove Gallery

// returns true if enroll was successful
function enroll(imgUrl, subjectId, callback){

    const params = {
        "image" : imgUrl,
        "subject_id" : subjectId,
        "gallery_name" : CONSTANTS.galleryName
    };

    const headersJson = {
        "Content-Type" : "application/json",
        "app_id" : CONSTANTS.appId,
        "app_key" : CONSTANTS.appKey
    };

    const options = {
        uri : CONSTANTS.enrollUrl,
        headers : headersJson,
        body : JSON.stringify(params)
        
    };

    request.post(options, (error, response, body) => {

        if(error){
            console.log("Error occured while enrolling");
            console.log(error);
            callback(false);
            return;
        }
        // after post
        //  console.log("SUCCESS");
        // console.log(JSON.stringify(response));
        callback(true);
        return;
    });
}

// returns true if recognize was sucessful
function recognize(imgUrl, galleryToSearch, callback){

    const params = {
        "image" : imgUrl,
        "gallery_name" : galleryToSearch
    };

    const headersJson = {
        "Content-Type" : "application/json",
        "app_id" : CONSTANTS.appId,
        "app_key" : CONSTANTS.appKey
    };

    const options = {
        uri : CONSTANTS.recognizeUrl,
        headers : headersJson,
        body : JSON.stringify(params)
    };

    request.post(options, (error, response, body) => {

        if(error){
            console.log("Error occured while running Recognize");
            console.log(error);
            callback(false);
            return;
        }

        // console.log("Success in recognize");
        if (typeof JSON.parse(body).Errors === 'undefined'){
            // go through all matches and return user Id's
            
            var resultArray = [];

            JSON.parse(body).images.forEach(function(image){
                resultArray.push(image.transaction.subject_id);
            });
            
            callback(resultArray);
            return;            
        }

        callback(false);
        return;
    });
}

function removeGallery(gallery, callback){
    
    const params = {
        "gallery_name" : gallery
    };
    
    const headerJson = {
        "Content-Type" : "application/json",
        "app_id" : CONSTANTS.appId,
        "app_key" : CONSTANTS.appKey
    };

    const options = {
        uri : CONSTANTS.removeGalleryUrl,
        headers : headerJson,
        body : JSON.stringify(params)
    };

    request.post(options, (error, response, body) => {
        if (error){
            console.log("Error occured in removing gallery");
            console.log(error);
            callback(false);
            return;
        }

        callback(true);
        return;
    });
}

module.exports = {
    enroll,
    recognize,
    removeGallery
};

// TESTING using node
// enroll("http://dreamatico.com/data_images/face/face-4.jpg");
// sleep.sleep(5);
// recognize("http://dreamatico.com/data_images/face/face-4.jpg", CONSTANTS.galleryName);
// sleep.sleep(5);
// removeGallery(CONSTANTS.galleryName);