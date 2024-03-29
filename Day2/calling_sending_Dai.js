import { BigNumber, ethers} from "ethers";
import { getProvider, getSigner } from "./utils.js";
import DaiContractAbi from "./abi/DaiAbi.js"

const mainnetProvider = getProvider(); //connecting to Mainnet via an RPC provider (Infura) 
const goerliSigner = getSigner(); //connecting to signer wallet via a private key (on Goerli). To get mainnet signer: getSigner(true);

const myAddress = goerliSigner.address;
const myBalance = await goerliSigner.getBalance();

console.log("My address is ", myAddress);
console.log("My balance is ", ethers.utils.formatEther(myBalance)," ETH");

const DaiAddress = "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844"; //found this one through Uniswap and it looks like a Dai contract clone deployed on Goerli
// const DaiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; - is the contract deployed on the mainnet


const DaiContract = new ethers.Contract(
    DaiAddress,
    DaiContractAbi,
    goerliSigner 
);

const DaiBalance = await DaiContract.balanceOf(myAddress);

console.log("My balance is ",ethers.utils.formatEther(DaiBalance)," DAI");

const DestinationAddress = await mainnetProvider.resolveName("dimonvsitf.eth");

console.log("Sending money to dimonvsitf.eth, a.k.a.", DestinationAddress)

const DaiTransfer = await DaiContract.transfer(DestinationAddress, ethers.utils.parseEther("5"));

console.log("the transaction Hash is ", DaiTransfer.hash)
await DaiTransfer.wait();

console.log("New Dai balance",ethers.utils.formatEther(DaiBalance));