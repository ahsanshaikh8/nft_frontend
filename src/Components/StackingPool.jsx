import { useMediaQuery } from "react-responsive";
import React from "react";
import BrandLogo from "./BrandLogo";
import Footer from "./Footer";
import SvgCard from "./SvgCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getUser } from "../Helpers/storage";
import { useState } from "react";
import server from "../apis/server";
import CryptoJS from "crypto-js";
import { useWallet } from "use-wallet";
export default function StackingPool() {
  const wallet=useWallet()
  const isBigScreen = useMediaQuery({ query: "(min-width: 600px)" });
  const navigator = useNavigate();
  const [allNfts,setAllNfts]=useState([])
  const [walletAddress,setWalletAddress]=useState([])
  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
  const [componentLoader,setComponentLoader]=useState(false)
  const [componentLoader1,setComponentLoader1]=useState(false)
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
  
    const userID=userType?._id
  useEffect(() => {
    getAllNfts()
  }, [componentLoader,componentLoader1]);
  const getAllNfts=async()=>{
    const {data} = await server.post(
      "users/getAllNftsByUserId",
      {
   
        "userId":userID
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
      console.log(data)
      setWalletAddress(data?.walletAddress)
      setAllNfts(data?.data)
    }
    
  }
  let pcHeadings = (
    <div>
      {" "}
      <div className="w-100 my-4 px-4 d-flex justify-content-between align-items-center text-end pr-5">
        <h1 className="title w-25 px-0">My Assets</h1>
        <div className="w-75">
          <span className="foot">Investment</span>
          <span className="foot">Staked NFT’s</span>
          <span className="foot">APY</span>
        </div>
      </div>
    </div>
  );
  let mobileHeadings = (
    <div>
      <h1
        className="title-m w-100 px-4"
        style={{
          fontSize: "22px!important",
        }}
      >
        Stacking Pool
      </h1>
      <div className="w-100 d-flex justify-content-even align-items-center px-4">
        <span className="foot">Investment</span>
        <span className="foot">Staked NFT’s</span>
        <span className="foot">APY</span>
      </div>
    </div>
  );
  return (
    <div className="stacking-pool">
      <BrandLogo className="hide-on-mobile" />
      {isBigScreen ? pcHeadings : mobileHeadings}
      <div className="cards-wrapper">
        {
        allNfts?.length==0?
        <text style={{color: "white", fontSize:"30px"}}>No assests found</text>
        :
        allNfts?.map((val,i)=>{
            return(<SvgCard data={val} walletAddress={walletAddress} loader={componentLoader} setloader={setComponentLoader} loader1={componentLoader1} setloader1={setComponentLoader1} />)
        })
      }
        
      </div>  
      <div className="stacking-pool-coins-img" />
      <Footer showSocials={false} />
    </div>
  );
}
