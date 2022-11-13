import 'dotenv/config';
const mongo = {
    URI: process.env.MONGO_URI || 'mongodb://localhost/degicredit_dev',
    //URI: process.env.MONGO_URI || "mongodb://"+process.env.MONGO_USER+":"+process.env.MONGO_PASS+"@localhost/"+process.env.MONGO_DBNAME_DEV,
    port: 27017
};

export default {
    mongo
};


