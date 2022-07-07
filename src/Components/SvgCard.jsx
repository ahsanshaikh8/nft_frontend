import React from "react";
import testImg from "../Images/thumbnail.png";
import MyButton from "./MyButton";
import server from "../apis/server";
import { useWallet } from "use-wallet";
import Web3 from "web3";
import { SiCounterstrike } from "react-icons/si";
import { toast } from 'react-toastify';
import { useState,useEffect } from "react";
const BettaCoin=require("../abis/abi.json")

var provider = process.env.REACT_APP_HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
const contractAddress=process.env.REACT_APP_CONTRACTADDRESS
const contractAbi=BettaCoin.abi

export default function SvgCard(props) {
  const wallet=useWallet()
  const artworkData=props?.data
  
  const walletAddress=props?.walletAddress
 
  const imagePath=`${process.env.REACT_APP_IMAGE_PATH}/${artworkData?.file}`
 
 
  const handleMint=async()=>{
   
    
    const {data} = await server.post(
      "/users/uploadIPFS",
      {
        "title":artworkData?.title,
        "description":artworkData?.description,
        "imageurl":imagePath
        
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
      console.log(contractAbi)
      console.log(contractAddress)
      console.log(artworkData?.amount_for_sale)
      web3.setProvider(wallet.ethereum)
      const value=100000000000000 * artworkData?.amount_for_sale
      const dv = new web3.eth.Contract(contractAbi, contractAddress);
       dv.methods
               .mint(wallet?.account,1,artworkData?.amount_for_sale, data)
               .send({ from: wallet?.account,value:value.toString()  },async function(result)
               {
                  console.log(result)
               })
               .on("transactionHash", async function (hash) { 
                toast.success("Transaction submitted. please wait for the network to confirm")
                ///users/InsertMintHash
                await server.post("/users/InsertMintHash",
                {
                  artId:artworkData?._id,
                   hash,
               },
                       {
                         headers: {
                           "Content-Type": "application/json",
                         },
                       }
                     )
                    .then((result)=>{
                       props?.loader==true?props?.setloader(false):props?.setloader(true)
                         console.log(result)
                    })
                     
                 
               
               })
               .then(r=>{
                
                toast.success("Nft minted successfully")
                props?.loader1==false?props?.setloader1(true):props?.setloader1(false)
                 console.log(r)

               })
               .catch(e=>{
                toast.error(e?.message)
                console.log(e)
               })
    }
   
  }
  return (
    <div className="svg-card">
      <img className="nft-image-in-svg-card" src={imagePath} alt="NFT pic" />
      <h2 className="nft-title-in-svg-card">{artworkData?.title}</h2>
      <div className="market-price">{artworkData?.status==1? 0.001 * artworkData?.amount_for_sale:artworkData?.price} BNB</div>
      <div className="hovered-info">
        <span className="mb-1">Description:</span>
        <span className="mb-1" style={{ 
          textOverflow: "ellipsis",
          maxWidth: "150px"
        }}>{artworkData?.description}</span>
        <span className="mb-1">Amount</span>
        <span className="mb-1">{artworkData?.amount_for_sale}</span>
        <div className="w-100 text-center mb-1">
          {
          artworkData?.status==0?
          <MyButton fullWidth title={"Waiting for approval"} disabled />
          :artworkData?.status==2?
          <MyButton fullWidth title={"Minting pending"} disabled />
          :wallet.status!="connected"?
           <MyButton fullWidth title={"Connect to wallet"} onClick={()=>{
            wallet.connect()
           }}
            />
            :wallet?.chainId!=97?
            <MyButton fullWidth title={"Switch to bsc testnet"} disabled />
           :wallet?.account?.toLowerCase() != walletAddress?.toLowerCase()?  
          <MyButton fullWidth title={"Switch to onboarding wallet"} disabled />
          :artworkData?.status==3?
          <MyButton fullWidth title={"List for sale"}  />
          :
          <MyButton fullWidth title={"Mint now"}  onClick={handleMint}/>
      }
        </div>
      </div>
    </div>
  );
}
