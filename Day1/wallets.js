import {BigNumber, ethers, Wallet} from "ethers";
import "dotenv/config";

// const wallet = ethers.Wallet.createRandom();

// console.log("address:", wallet.address);
// console.log("private key:", wallet.privateKey);
// console.log("mnemonic:", wallet.mnemonic.phrase);

// let path, myWallet;

// for (let i=0; i<10; i++) {
//     path = `m/44'/60'/0'/0/${i}`;
//     myWallet = ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path);
//     console.log("address:", i, myWallet.address);
//     console.log("private key:", i, myWallet.privateKey);
// }

//connecting to blockchain via Infura
const provider = new ethers.providers.InfuraProvider("goerli",process.env.INFURA_KEY);
await provider.detectNetwork();

// console.log(process.env.MY_WALLET_PRIVATE_KEY);
//finding a wallet that matches my private key
const wallet = new ethers.Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider); 
console.log("My public wallet address (from a private key) is", wallet.address);

//making sure I got signer permissions before signing a message using cryptographic hashing
console.log(wallet._isSigner);
const signature = await wallet.signMessage("Hola!")
console.log("Signed message", signature);

//doublechecking the public address of the wallet that signed this message (requires message and signature in hex)
const signerAddress = ethers.utils.verifyMessage("Hola!",signature);
console.log("Signer address",signerAddress);

//checking the current balance on Goerli testnet
const testWalletBalance = await provider.getBalance(signerAddress)
console.log("My Goerli balance is: ", ethers.utils.formatEther(testWalletBalance));

// now time to send some Goerli ETH 
const tx = await wallet.sendTransaction(
    {
        to: "0x165A190a652F3B4024DF2C8F669A7DF906959b4A",
        value: testWalletBalance.div(BigNumber.from("4")),
    }
);

console.log("TX sent!", tx);

await tx.wait();

console.log("TX confirmed");
