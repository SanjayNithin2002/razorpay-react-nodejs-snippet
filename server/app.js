const express = require('express');
const app = express();
const Razorpay = require('razorpay');
const shortid = require('shortid');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: 'rzp_test_73wohYapKBYpbR',
    key_secret: 'O6gJNi2cZIQoxnQAcxQ8sZMU'
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        message: 'Backend for Razorpay'
    });
});

app.post('/verification', async (req, res) => {
    const secret = 'whateven';
    const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')
    if(digest === req.headers['x-razorpay-signature']){
        console.log('success');
    }else{
        console.log('failure');
    }
    res.json({
        status : 'ok'
    })
});

app.post("/razorpay", async (req, res) => {
    try{
        const options = {
            amount : 50000,
            currency : "INR",
            receipt : shortid.generate(),
            partial_payment : false
        }
        const response = await razorpay.orders.create(options);
        console.log(response);
        res.status(201).json(response);
    }catch(err){
        console.log(err);
    }
    

})

app.listen(1337, () => {
    console.log('Listening at 1337.');
})