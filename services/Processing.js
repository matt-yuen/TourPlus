
'use strict';

const request = require("request");
const sleep = require("sleep");
const CONSTANTS = require("./Constants");

var applicants = 0;


// function list
// 1. Enroll
// 2. Recognize
// 3. Remove Gallery

// returns true if enroll was successful
function enroll(imgUrl){

    ++applicants;

    var id = "Applicant_" + applicants;

    const params = {
        "image" : imgUrl,
        "subject_id" : id,
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
            return false;
        }

        // after post
        // console.log("SUCCESS");
        // console.log(JSON.stringify(response));
        
        return true;

    });

}

// returns true if recognize was sucessful
function recognize(imgUrl, galleryToSearch){

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
            return false;
        }

        // console.log("Success in recognize");
        if(JSON.parse(body).images[0].transaction.status == "success"){
            console.log("Success in recognize");
            return true;
        }
        return false;

    });

}

function removeGallery(gallery){
    
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
            return false;
        }

        // console.log("Success in remove gallery");
        // console.log(JSON.stringify(response));
        return true;
    });
}

// TESTING using node
// enroll("http://dreamatico.com/data_images/face/face-4.jpg");
// sleep.sleep(5);
// recognize("http://dreamatico.com/data_images/face/face-4.jpg", CONSTANTS.galleryName);
// sleep.sleep(5);
// removeGallery(CONSTANTS.galleryName);