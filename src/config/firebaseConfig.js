const admin = require('firebase-admin');
const serviceAccount = require('./../../easy-money-images-firebase-adminsdk-fbsvc-d9916d3774.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET
});

const bucket = admin.storage().bucket();
module.exports = { bucket };
