const mongoose = require('mongoose');
module.exports = async () => {
   console.log("CONNECTING TO DATABASE...");
   
    try {
        await mongoose.connect('mongodb+srv://xaiy95494979:easymoney2025@cluster0.qhqxr.mongodb.net/easy_money?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};