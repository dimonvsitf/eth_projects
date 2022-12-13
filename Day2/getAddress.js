import { BigNumber, ethers} from "ethers";
import { getProvider, getSigner } from "./utils.js";
import DaiContractAbi from "./abi/DaiAbi.js"

const mainnetProvider = getProvider(); //connecting to Mainnet via an RPC provider (Infura) 
const goerliSigner = getSigner(); //connecting to signer wallet via a private key

const myAddress = goerliSigner.address;
const myBalance = await goerliSigner.getBalance();

console.log("My address is ", myAddress);
console.log("My balance is ", ethers.utils.formatEther(myBalance)," ETH");

const DaiAddress = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; //found this one through Uniswap and it looks like a Dai contract clone deployed on Goerli
// const DaiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; - is the contract deployed on the mainnet


const DaiContract = new ethers.Contract(
    DaiAddress,
    DaiContractAbi,
    goerliSigner // can be substituted for mainnetProvider if want to switch from Goerli to Mainnet
);

const DaiBalance = await DaiContract.balanceOf(myAddress);

console.log("My balance is ",ethers.utils.formatEther(DaiBalance)," DAI");

