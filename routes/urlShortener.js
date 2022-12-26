const express = require('express');
const router = express.Router();

const randomString = require('randomstring');
const { insertUrlShortener, findUrlShortenerByUrl } = require('../models/db');




router.post('/url', async(req, res)=>{
    try{
    console.info('[Url Shortener] Url generation has started');
    const { url } = req.body;
    const tinyUrl = randomString.generate(5);
    await insertUrlShortener({ url, tinyUrl: tinyUrl });
    console.info('[Url Shortener] Url generation has Ended', tinyUrl);
    return res.send({
      url,
      tinyUrl,
    });
    } catch(e){
        console.error(`Error in Generating Shorten Url`);
        return res.send({
            data: 'Error in generating shorten url'
        })
    }
});

router.get('/:tinyUrl', async(req, res)=>{
    try{
        const {tinyUrl} = req.params;
        const response = await findUrlShortenerByUrl(tinyUrl);

        if(!response){
            throw new Error('Error in fetching url');
        }
        return res.redirect(response.url);
    }catch(e){
        console.error('Error in fetching tiny url')
        return res.send({
            data: 'Error in fetching tiny url'
        })
    }
})

module.exports = router