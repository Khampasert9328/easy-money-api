const path = require('path');
const { bucket } = require('../config/firebaseConfig');

// Upload the file to Firebase and return the public URL or file name
exports.uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        const fileName = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
        const blob = bucket.file(fileName);
        console.log('Uploading file1:', blob);
        

        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });
        console.log('Uploading file2:', blobStream);
        

        blobStream.on('error', (err) => {
            reject(new Error(`Error uploading to Firebase: ${err.message}`));
        });

        blobStream.on('finish', async () => {
            try {
                // Optionally make the file public
                await blob.makePublic();
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                resolve({
                    fileName: blob.name,     // Save this if you want to keep only the name
                    publicUrl: publicUrl,    // Save this if you want the full URL
                });
            } catch (err) {
                reject(new Error(`Error making file public: ${err.message}`));
            }
        });

        blobStream.end(file.buffer);
    });
};
