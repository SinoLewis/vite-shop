const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request")

const app = express();
const corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/auth', function (req, res) {
    request({
        url: "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic SGQzVnpYMEtLMkdrU0QwUW1wQkE2TW1SeFdSREdlQVU6cEpGR2JoZWM5U2VqaGx3ZA"
        }
    }, (error, response, body) => {
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(JSON.parse(body))
        }
    })
});

app.post('/lipa', function (req, res) {
    request({
        url: "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic SGQzVnpYMEtLMkdrU0QwUW1wQkE2TW1SeFdSREdlQVU6cEpGR2JoZWM5U2VqaGx3ZA"
        }
    }, (error, response, body) => {
        console.log(req.body)
        if (error) {
            console.log(error)
        } else {
            res.status(200).json(body)
        }
    })

});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});