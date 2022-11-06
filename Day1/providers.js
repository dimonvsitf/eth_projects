import 'dotenv/config';
import { BigNumber, ethers } from "ethers";

//const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
//const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const provider = new ethers.providers.InfuraProvider("homestead",process.env.INFURA_KEY);

//console.log("Current block number", await provider.getBlockNumber());
//console.log("atg.eth is", await provider.resolveName("atg.eth"));

//console.log("who lives in 0xf013E5F697E84C6831220A21a96556242Ee9AD86? IT IS", await provider.lookupAddress("0xf013E5F697E84C6831220A21a96556242Ee9AD86"));
const vitalikBalance = await provider.getBalance("vitalik.eth");

const vitalikEth = ethers.utils.formatEther(vitalikBalance);
console.log ( "vitalik.eth has",vitalikEth,"ETH"); //vitalik.eth has 900.050356740334400065 ETH

const vitalikGwei = ethers.utils.formatUnits(vitalikBalance, "gwei");
console.log (vitalikGwei, "gwei"); //900050356740.334400065 gwei
console.log (ethers.utils.parseEther(vitalikEth)); //BigNumber { _hex: '0x30cab536c8bf3db241', _isBigNumber: true }

console.log(ethers.utils.parseEther("1.5")); //BigNumber { _hex: '0x14d1120d7b160000', _isBigNumber: true }

const austinBalance = await provider.getBalance("atg.eth");
const austinEth = ethers.utils.formatEther(austinBalance);

console.log("Austin Griffiths has", austinEth, "ETH");

/// Now time for BigNumber operations (mathematics) https://docs.ethers.io/v5/api/utils/bignumber/ 

//comparison

if (vitalikBalance.gt(ethers.utils.parseEther("900"))) {
    console.log("Vitalik has over 900!!!!");
};
