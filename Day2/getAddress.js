import { BigNumber, ethers} from "ethers";
import { getProvider, getSigner } from "./utils.js";
import DaiContractAbi from "./abi/DaiAbi.js"

const mainnetProvider = getProvider(true); //connecting to Mainnet via an RPC provider (Infura) 
const goerliSigner = getSigner(); //connecting to signer wallet via a private key

const myAddress = goerliSigner.address
const myBalance = await goerliSigner.getBalance();

console.log("My address is ", myAddress);
console.log("My balance is ", ethers.utils.formatEther(myBalance));

const DaiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const DaiContract = new ethers.Contract(
    DaiAddress,
    DaiContractAbi,
    mainnetProvider // can be substituted for mainnetProvider if want to switch from Goerli to Mainnet
);

const DaiBalance = await DaiContract.balanceOf(myAddress);

console.log("My balance is ",ethers.utils.formatEther(DaiBalance));