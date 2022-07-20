import React, { useState } from "react";
import { getUser } from "../Helpers/storage";
import MyButton from "./MyButton";
import SignUp from "./SignUp";
import Web3 from "web3";
import { toast } from 'react-toastify';
import { useWallet } from "use-wallet";
import CryptoJS from "crypto-js";
import server from "../apis/server";
const BettaCoin=require("../abis/abi.json")
const Marketplace=require("../abis/marketabi.json")

var provider = process.env.REACT_APP_HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
const contractAddress=process.env.REACT_APP_CONTRACTADDRESS
const contractAbi=BettaCoin.abi
const marketplaceContractAddress=process.env.REACT_APP_MARKETPLACECONTRACTADDRESS
const marketplaceContractAbi=Marketplace.abi
function AssetCard(props) {
  const [pendingState,setPendingState]=useState(false)
  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
  
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
  
    const userId=userType?._id
   const wallet=useWallet()
  console.log(props?.data)
  const data=props?.data
  const imagePath=`${process.env.REACT_APP_IMAGE_PATH}/${data?.file}`
  const [showBuy, setShowBuy] = useState(false);

  const [state, setState] = useState({
    showSignUpModal: false,
  });
  const showSignUpModalF = () => {
    console.log(!state.showSignUpModal);
    setState((prev) => ({
      ...prev,
      showSignUpModal: !state.showSignUpModal,
    }));
  };
  const handleBuyClick = async(e) => {
    console.log(data?.nft_id)
    if(wallet.status!="connected")
    {
      toast.error("please connect to your wallet")
      
    }
    else if(data?.userId==userId)
    {
      toast.error("you already own this nft")
    }
    else
    {
      await server.post("/users/checkBuyingStatus",
                {
                  userId:data?.userId,
                  nft_id:data?.nft_id,
                  token_id:data?.token_id

               },
                       {
                         headers: {
                           "Content-Type": "application/json",
                         },
                       }
                     )
                     .then(async(result)=>{
                      console.log(result?.data.error)
                      if(result?.data?.error)
                      {
                        
                        toast.error(result?.data?.error)
                      }
                      else
                      {
                        const indexhash=data?.index_hash
      const listedPrice=data?.listed_price

      console.log(indexhash)
      console.log(listedPrice)
      const weiPrice = web3.utils.toWei(listedPrice.toString(), "ether");
      web3.setProvider(wallet.ethereum)
      const marketplaceDv=new web3.eth.Contract(marketplaceContractAbi, marketplaceContractAddress);
      console.log(marketplaceContractAddress)
      console.log(marketplaceContractAbi)
      marketplaceDv.methods.buyWithEth(indexhash)
      .send({ from: wallet?.account,value:weiPrice},async function(result)
      {
         console.log(result)
      })
      .on("transactionHash", async function (hash) { 
        setPendingState(true)
        console.log(hash)
        toast.success("Transaction submitted. please wait for the network to confirm")
        await server.post("/users/insertNewNftData",
                {
                  file:data?.file,
                  description:data?.description,
                  title:data?.title,
                  userId:userId,
                  nftId:data?.nft_id,
                  token_id:data?.token_id

               },
                       {
                         headers: {
                           "Content-Type": "application/json",
                         },
                       }
                     )
                    .then(async(result)=>{
                     await server.post("/users/insertPendingBuyingStatus",
                     {
                      tokenId:data?.token_id,
                      userId:data?.userId,
                      nftId:data?.nft_id,
                      buyer_user_id:userId,
                      buying_wallet_address:wallet?.account,
                      hash:hash
                   },
                           {
                             headers: {
                               "Content-Type": "application/json",
                             },
                           }
                         )
                         
                    })
       })
       .then(r=>{
        setPendingState(false)
        props?.loader==false?props?.setloader(true):props?.setloader(false)
        toast.success("NFT has been bought successfully.")
         console.log(r)
       })
       .catch(e=>{
        setPendingState(false)
         toast.error(e?.message)
         console.log(e)
        })
                        console.log(result)
                      }
                     
                     })
      
    }
  };
  return (
    <div
      className="my-card hoverable"
      onMouseEnter={() => {
        setShowBuy(true);
      }}
      onMouseLeave={() => {
        setShowBuy(false);
      }}
    >
      {/* <SignUp
        show={state.showSignUpModal}
        closeModal={() => {
          showSignUpModalF();
        }}
      /> */}
      <img src={imagePath} alt="drone" width={"235px"} height={"140px"} />
      <p className="asset-title">{data?.title} </p>
      <p className="asset-detail">PRICE: {data?.listed_price}</p>
      <p className="asset-detail">Serial: {data?.token_id}</p>
      {/* {showBuy && <MyButton className="text-white w-50 mt-3" title={"Buy"} />} */}
      {!pendingState?
      <MyButton
        className="text-white w-50 mt-3 buy-b"
        title={"Buy"}
        onClick={handleBuyClick}
      />
      :
      <MyButton
        className="text-white w-50 mt-3 buy-b"
        title={"buying in process...."}
       
      />
}
    </div>
  );
}

export default AssetCard;
