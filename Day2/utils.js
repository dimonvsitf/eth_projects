import "dotenv/config";
import { BigNumber ,ethers } from "ethers";

// console.log("infura key", process.env.INFURA_KEY);

const getProvider = (mainnet = false) => {
    const providerUrl = mainnet
    ? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`// if we call getProvider(True) 
    : `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`; // if we call getProvider()

    return new ethers.providers.JsonRpcProvider(providerUrl);
}

const getSigner = (mainnet = false) => {
    const provider = getProvider();
    // console.log("Provider", await provider.getNetwork());

    return new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider); 
}

//es6 module syntax
export { getProvider, getSigner, generateNewWallet};

// const signer = getSigner();
// console.log("signer", await signer.getAddress());
// console.log("balance", ethers.utils.formatEther(await signer.getBalance()));

const generateNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();

    console.log("address:", wallet.address);
    console.log("private key:", wallet.privateKey);
    console.log("mnemonic:", wallet.mnemonic.phrase);    
}