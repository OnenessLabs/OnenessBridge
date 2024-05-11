// import axios from "axios";
// import CryptoJS from "crypto-js";
//
// // Replace these with your actual API Key, Secret Key, and Passphrase
// const apiKey = '378e9e29-3d6c-47e1-b127-ea620a325040';
// const secretKey = '6759E56F0FBD1C530E5428BFBD6B4D26';
// const passphrase = 'Woaipao520!';
//
// const timestamp = new Date().toISOString();
// const method = 'GET';
// const requestPath = '/api/v5/explorer/brc20/inscriptions-list?page=1&limit=30&inscriptionId=d8964830ea07fe1981d644b7913d49fc29fa22cebd7bf7858a4565a84c79fe22i0';
// // const requestPath = '/api/v5/explorer/brc20/inscriptions-list?page=1&limit=30&inscriptionId=92780ef845a5190a1027724c24b5adbe6713abdaa43c5f273ff8a87d41f6cc8ci0';
//
// // Creating the Sign
// const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + requestPath, secretKey))
//
// // Setting the headers
// const headers = {
//     'OK-ACCESS-KEY': apiKey,
//     'OK-ACCESS-SIGN': sign,
//     'OK-ACCESS-TIMESTAMP': timestamp,
//     'OK-ACCESS-PASSPHRASE': passphrase,
//     'Content-Type': 'application/json'
// };
//
// const getList = (res) => {
//     console.error(res.data);
//     console.error(res.data[0].inscriptionsList.length);
// }
//
// axios({
//     method: method,
//     url: `https://www.okx.com${requestPath}`,
//     headers: headers,
// })
//     .then(response => getList(response.data))
//     .catch(error => console.error(error));