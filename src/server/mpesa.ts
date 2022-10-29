var clientId = import.meta.env.MPESA_CLIENT_ID;
var clientSecret = import.meta.env.MPESA_CLIENT_SEC;
var encodedData = Buffer.from(clientId + ':' + clientSecret).toString('base64');

let headers: any = {
    mode: 'cors',
    Authorization: "Bearer " + encodedData,
    "Access-Control-Allow-Origin": '*',
}

export function auth() {
    fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", headers)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log(error));
}