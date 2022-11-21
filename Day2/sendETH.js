import { BigNumber, ethers} from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true); //connecting to Mainnet via an RPC provider (Infura) 
const goerliSigner = getSigner(); //connecting to signer wallet via a private key

const myBalance = await goerliSigner.getBalance();

console.log("My balance is ", ethers.utils.formatEther(myBalance));

// now time to send some Goerli ETH 

const receiverAddress = await mainnetProvider.resolveName("dimonvsitf.eth") //finding an address based on ENS name
console.log("Sending ether to", receiverAddress);

const tx = await goerliSigner.sendTransaction(
    {
        to: receiverAddress,
        value: myBalance.div(BigNumber.from(10)),
    }
);

console.log("TX sent!", tx.hash);

await tx.wait();

console.log("TX confirmed");