/*
*Please add project folder name and ibm bucket name here,
* make sure project folder name doesnt not have spaces in between and is same
* as the name you give while running upload_setup.sh
*/
var s3BucketCredentials = {
    "projectFolder": "wecredits-bucket",
    "bucket": "wecredits-bucket",
    "accessKeyId": "AKIA46K4LMSSEKBVQSRX",
    "secretAccessKey": "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",
    "s3URL": "https://wecredits-bucket.s3.ap-southeast-2.amazonaws.com",
    "folder": {
        "profilePicture": "profilePicture",
        "thumb": "thumb",
        "original": "original",
        "image": "image",
        "docs": "docs",
        "files": "files",
        "video": "video",
        "audio": "audio"
    }
};
export default {
    s3BucketCredentials: s3BucketCredentials
};