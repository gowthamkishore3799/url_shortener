const mongoose = require('mongoose');
require('dotenv').config()

const mongoConnectionString = process.env.MONGO_DB_URL;
const db = mongoose.createConnection(`${mongoConnectionString}projects`, {readPreference: 'secondaryPreferred'}, function (err, database) {
    if (err) throw err;
    console.info('[INFO] Mongodb connected');
});


const UrlShortener = db.model('tinyUrl', new mongoose.Schema({
    url: String,
    tinyUrl: String,
    createdDate: {type: Date, default: Date.now()}
}))



const findUrlShortenerByUrl = async (url) =>{
    const response = await UrlShortener.findOne({tinyUrl: url}).lean();
    return response;
}


const insertUrlShortener = async (urlObj) =>{
    const url = new UrlShortener({...urlObj});
    await url.save();
}


module.exports = {
    insertUrlShortener,
    findUrlShortenerByUrl
}



