import {ethers} from "ethers";
import { getProvider } from "./utils.js";
import dimonvsitfNFTAbi from "./abi/ENSabi.js"

const ENSaddress = "0x283Af0B28c62C092C9727F1Ee09c02CA627EB7F5"; //ENS contract address https://etherscan.io/address/0x283af0b28c62c092c9727f1ee09c02ca627eb7f5
const goerliProvider = getProvider(); //for a ready-only connection

const dimonvsitfContract = new ethers.Contract(
    ENSaddress, 
    dimonvsitfNFTAbi, 
    goerliProvider 
    );  // new ethers.Contract( address , abi , signerOrProvider )

//from ABI
// inputs: [
//     { internalType: "string", name: "name", type: "string" },
//     { internalType: "uint256", name: "duration", type: "uint256" },
//   ],
const rentPrice = await dimonvsitfContract.rentPrice("dimonvsitf.eth",900000000); //name:dimonvsitf.eth, duration:900000000 seconds or 28.5 calendar years

// returns the cost, in wei, to register or renew the provided name for the provided duration, in seconds. Callers should note that this price may vary over time, particularly if the pricing oracle is relying on a fiat price conversion.


console.log(ethers.utils.formatEther(rentPrice)); // how much it costs to rent a name