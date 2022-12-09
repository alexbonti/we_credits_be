/*
*Please add project folder name and ibm bucket name here,
* make sure project folder name doesnt not have spaces in between and is same
* as the name you give while running upload_setup.sh
*/
var s3BucketCredentials = {
    "projectFolder": "degicredit-bucket",
    "bucket": "degicredit-bucket",
    "accessKeyId": "AKIAVF72J5OOI7VYO3WN",
    "secretAccessKey": "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",
    "s3URL": "https://my-maps-bucket.s3.ap-southeast-2.amazonaws.com",
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