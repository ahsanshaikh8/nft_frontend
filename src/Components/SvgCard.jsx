import React from "react";
import testImg from "../Images/thumbnail.png";
import MyButton from "./MyButton";
import server from "../apis/server";
import { useWallet } from "use-wallet";
import Web3 from "web3";
import { SiCounterstrike } from "react-icons/si";
const BettaCoin=require("../abis/abi.json")

var provider = process.env.REACT_APP_HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
const contractAddress=process.env.REACT_APP_CONTRACTADDRESS
const contractAbi=BettaCoin.abi

export default function SvgCard(props) {
  console.log(contractAddress)
  console.log(contractAbi)
  const wallet=useWallet()
  const data=props?.data
  console.log(wallet?.chainId)
  console.log(wallet?.networkName)
  const walletAddress=props?.walletAddress
 
  const imagePath=`${process.env.REACT_APP_IMAGE_PATH}/${data?.file}`
  const handleMint=async()=>{
   
    
    const {data} = await server.post(
      "/users/uploadIPFS",
      {
        "title": "test",
        "description": "kk",
        "imageurl": "http://194.5.193.238:8000/api/users/nft_image/d1b530182d3558062ca9d3af13c67db1.jpeg"
        
    } 
     ,
      { 
        headers: {
          "Content-Type": "application/json",
     },
      } 
    )
    if(data)
    {
      console.log(wallet?.account)
      console.log(contractAbi)
      console.log(contractAddress)
      console.log(provider)
      web3.setProvider(wallet.ethereum)
      const dv = new web3.eth.Contract(contractAbi, contractAddress);
       dv.methods
               .mint("0x33a174b4B629F6b8F8b3617f0A2E7C375945900e",1,5, data)
               .send({ from: "0x33a174b4B629F6b8F8b3617f0A2E7C375945900e",value:"100000000000000"  },async function(result)
               {

               })
               .on("transactionHash", async function (hash) { 
               })
               .then(r=>console.log(r))
               .catch(e=>console.log(e))
    }
   
  }
  return (
    <div className="svg-card">
      <img className="nft-image-in-svg-card" src={imagePath} alt="NFT pic" />
      <h2 className="nft-title-in-svg-card">{data?.title}</h2>
      <div className="market-price">{data?.price}</div>
      <div className="hovered-info">
        <span className="mb-1">Description:</span>
        <span className="mb-1" style={{ 
          textOverflow: "ellipsis",
          maxWidth: "150px"
        }}>{data?.description}</span>
        <span className="mb-1">Amount</span>
        <span className="mb-1">{data?.amount_for_sale}</span>
        <div className="w-100 text-center mb-1">
          {
          data?.status==0?
          <MyButton fullWidth title={"Waiting for approval"} disabled />
          :
          wallet.status!="connected"?
           <MyButton fullWidth title={"Connect to wallet"} onClick={()=>{
            wallet.connect()
           }}
            />
            :wallet?.chainId!=97?
            <MyButton fullWidth title={"Switch to bsc testnet"} disabled />
           :wallet?.account?.toLowerCase() != walletAddress?.toLowerCase()?  
          <MyButton fullWidth title={"Switch to onboarding wallet"} disabled />
          :
          <MyButton fullWidth title={"Mint now"}  onClick={handleMint}/>
      }
        </div>
      </div>
    </div>
  );
}
