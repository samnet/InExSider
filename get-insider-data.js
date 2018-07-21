const Web3 = require('web3');
const got = require('got');

var web3 = new Web3(new Web3.providers.HttpProvider(
  'https://ropsten.infura.io/v3/71f27287163440678856b98881dda4ee'
));

const address = '0x11f6a681f45d9d76ed037c9a00fd6c39295dc5ba';
const insiderAddr = '0x9faf5515f177f3a8a845d48c19032b33cc54c09c';
const esapiToken = 'D9W141E2F1T4JSPKD6787ZNVHGFEPW55XF';
const erc20Address = '0xfc86648487f2612072ac0d53e77d5ae9286a8b86';


getHoldingsTs(insiderAddr, erc20Address)
  .then(holdings => {

    console.log(holdings)
  })


// getABI(address)
//   .then((abi) => {
//     // console.log("ABI IS:", abi)
//     const ethwContractInstance = new web3.eth.Contract(JSON.parse(abi), address);
//     // console.log("INSTANCE IS:", ethwContractInstance)

//     ethwContractInstance.getPastEvents('allEvents', {
//       fromBlock: 0
//     })
//     .then((events) => {
//       console.log(events.length)
//     })
//   })


// function getABI (address) {
//   return got(`https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=${address}`, { json: true })
//     .then(response => {
//       console.log('ABI response message:' + response.body.message);
//       return response.body.result;
//     }).catch(error => {
//       console.log(error.response.body);
//     });
// }

function getHoldingsTs (insiderAddr, erc20Address) {

  const url = 'http://api-ropsten.etherscan.io/api'
  + `?module=account&action=tokentx&address=${insiderAddr}`
  + `&contractaddress=${erc20Address}`
  + `&startblock=0&endblock=999999999&sort=asc&apikey=${esapiToken}`;

  return got(url, { json: true })
  .then(response => {
    console.log('Holdings response message:' + response.body.message);
    return response.body.result
      // .filter(a => a.hash === '0x08db0742609ca2449b0114af6080e1d89ac8cfe3e2a8a2bf772b018b9e6e1cb8')
      .map(a => {
        return {
          timeStamp: a.timeStamp,
          from: a.from,
          to: a.to,
          value: a.value / Math.pow(10, a.tokenDecimal)
        }
      });
  }).catch(error => {
    console.log(error.response.body);
  });

}

