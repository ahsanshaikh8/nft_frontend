import React from "react";
import testImg from "../Images/thumbnail.png";
import MyButton from "./MyButton";
import server from "../apis/server";
import { useWallet } from "use-wallet";
import Web3 from "web3";
import { SiCounterstrike } from "react-icons/si";
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { useState,useEffect } from "react";
import Select from 'react-select';
import MyTextField from "./MyTextField";
import CryptoJS from "crypto-js";
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const BettaCoin=require("../abis/abi.json")
const Marketplace=require("../abis/marketabi.json")

var provider = process.env.REACT_APP_HTTP_NODE;
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
const contractAddress=process.env.REACT_APP_CONTRACTADDRESS
const contractAbi=BettaCoin.abi
const marketplaceContractAddress=process.env.REACT_APP_MARKETPLACECONTRACTADDRESS
const marketplaceContractAbi=Marketplace.abi
const customStyles1 = {
  control: (styles) => ({ ...styles, color: 'white' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    color: state.isSelected ? "#9FC131" : "#000",

  }),
  input: (styles) => ({ ...styles, color:"white" }),
 
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },

};
export default function SvgCard(props) {
  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
  
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
  
    const userId=userType?._id
  const [listingStatus,setListingStatus]=useState(false)
  const [cancelListing,setCancelListing]=useState(false)
  const [listValue,setListValue]=useState("")
  const [selectedOption, setSelectedOption] = useState(null);
  const wallet=useWallet()
  const artworkData=props?.data
 
  const listedArrayOfObjects=artworkData?.nftList
  const lastListedPrice=listedArrayOfObjects?.slice(-1)[0]?.listed_price

  console.log(lastListedPrice)
  let listedArray = listedArrayOfObjects?.map(a => a.token_id);
  
  let mintedIds=artworkData?.minted_ids?artworkData?.minted_ids[0]:null
  
  let mintedIdsArray=[]
  let unlistedTokenIds = mintedIds?.filter(f => !listedArray?.includes(f));
  let listedTokenIds=mintedIds?.filter(f => listedArray?.includes(f));

  
  for (var i=0;i<unlistedTokenIds?.length;i++)
  {
        mintedIdsArray.push({ value: `${unlistedTokenIds[i]}`, label: `${unlistedTokenIds[i]}` })
  }
  
  const walletAddress=props?.walletAddress
  
  const imagePath=`${process.env.REACT_APP_IMAGE_PATH}/${artworkData?.file}`
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  function openModal1() {
    setIsOpen1(true);
  }

  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal1() {
    setIsOpen1(false);
  }
  const handleCancelListing=async(value)=>{
    console.log(value)
    const indexHash=value?.index_hash
    web3.setProvider(wallet.ethereum)
    const marketplaceDv=new web3.eth.Contract(marketplaceContractAbi, marketplaceContractAddress);
    marketplaceDv.methods.cancelTrade(indexHash)
    .send({ from: wallet?.account},async function(result)
    {
       console.log(result)
    })
    .on("transactionHash", async function (hash) { 
      setCancelListing(true)
      closeModal1()
      //insertListingStatus
      await server.post("/users/insertListingStatus",
                {
                  id:value?._id,
                  hash
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
              setCancelListing(false)
      toast.success("Listed cancelled successfully")
      props?.loader1==false?props?.setloader1(true):props?.setloader1(false)
       console.log(r)
     })
     .catch(e=>{
      setCancelListing(false)
      toast.error(e?.message)
      console.log(e)
     })

  }
 const handleListing=async()=>{
  web3.setProvider(wallet.ethereum)
  const weiPrice = web3.utils.toWei(listValue.toString(), "ether");
  console.log(weiPrice)
  const dv = new web3.eth.Contract(contractAbi, contractAddress);
  const approval = await dv.methods.isApprovedForAll(wallet?.account, marketplaceContractAddress).call();
  const marketplaceDv=new web3.eth.Contract(marketplaceContractAbi, marketplaceContractAddress);
  console.log(approval)
  if(approval)
  {
      marketplaceDv.methods.createTrade(contractAddress,selectedOption?.value,weiPrice,0)
               .send({ from: wallet?.account},async function(result)
               {
                  console.log(result)
               })
               .on("transactionHash", async function (hash) { 
                setListingStatus(true)
                toast.success("Transaction submitted. please wait for the network to confirm")
                setSelectedOption(null)
                closeModal1()
                ///users/insertListHash
                await server.post("/users/insertListHash",
                {
                  artId:artworkData?._id,
                   hash,
                   token_id:selectedOption?.value,
                   listed_price:listValue,
                   userId
               },
                       {
                         headers: {
                           "Content-Type": "application/json",
                         },
                       }
                     )
                    .then((result)=>{
                       
                         console.log(result)
                    })
            
               })
               .then(r=>{
               setListingStatus(false)
                toast.success("Nft Listed successfully")
                props?.loader1==false?props?.setloader1(true):props?.setloader1(false)
                 console.log(r)

               })
               .catch(e=>{
                toast.error(e?.message)
                console.log(e)
               })
  }  
  else
  {
    await dv.methods.setApprovalForAll(marketplaceContractAddress, true).send({
    from: walletAddress
     }, () => {
         

     })
    .then(() => { 
      marketplaceDv.methods.createTrade(contractAddress,selectedOption?.value,weiPrice,0)
      .send({ from: wallet?.account},async function(result)
      {
         console.log(result)
      })
      .on("transactionHash", async function (hash) { 
        closeModal1()
       toast.success("Transaction submitted. please wait for the network to confirm")
       await server.post("/users/insertListHash",
       {
         artId:artworkData?._id,
          hash,
          token_id:selectedOption?.value,
          listed_price:listValue,
          userId
      },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
           .then((result)=>{
              
                console.log(result)
           })
        
      })
      .then(r=>{
       closeModal1()
       toast.success("Nft listed successfully")
       props?.loader1==false?props?.setloader1(true):props?.setloader1(false)
        console.log(r)

      })
      .catch(e=>{
       toast.error(e?.message)
       console.log(e)
      })
     })
  }
 }
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
      {artworkData?.status==1?
      <div className="market-price">{artworkData?.status==1? 0.001 * artworkData?.amount_for_sale:artworkData?.price} BNB</div>
      :null}
      
      <div className="hovered-info">
        <span className="mb-1">Description:</span>
        <span className="mb-1" style={{ 
          textOverflow: "ellipsis",
          maxWidth: "150px"
        }}>{artworkData?.description}</span>
        <span className="mb-1">Amount (No of copies)</span>
        <span className="mb-1">{artworkData?.minted_ids[0]?.length?artworkData?.minted_ids[0]?.length:artworkData?.amount_for_sale}</span>
        <span className="mb-1">Category</span>
        <span className="mb-1">{artworkData?.category}</span>
        {artworkData?.status==3?
        <>
        <span className="mb-1">Listed</span>
        <span className="mb-1">{!listedTokenIds?"0":listedTokenIds?.length}</span>
        </>
        :null}
        <div className="w-100 text-center mb-1">
          {
          artworkData?.status==0?
          <MyButton fullWidth title={"Waiting for admin approval"} disabled />
          :artworkData?.status==2?
          <MyButton fullWidth title={"Minting pending"} disabled />
          :wallet.status!="connected"?
           <MyButton fullWidth title={"Connect to wallet"} onClick={()=>{
            openModal()
           }}
            />
            :wallet?.chainId!=97?
            <MyButton fullWidth title={"Switch to bsc testnet"} disabled />
           :wallet?.account?.toLowerCase() != walletAddress?.toLowerCase()?  
          <MyButton fullWidth title={"Switch to onboarding wallet"} disabled />
          :artworkData?.status==3?
          listingStatus?
          <MyButton fullWidth title={"Listing pending..."} disabled />
          :cancelListing?
          <MyButton fullWidth title={"Cancel Listing pending..."} disabled />
          :
          <MyButton fullWidth title={"List for sale"} onClick={()=>{
            openModal1()
          }} />
          :
          <MyButton fullWidth title={"Mint now"}  onClick={handleMint}/>
      }
        </div>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
     style={customStyles}
        contentLabel="Example Modal"
      >
      
          <button onClick={()=>{
            wallet.connect()
            closeModal()
          }}>Connect to METAMASK</button>
          <button onClick={()=>{
            console.log(wallet.status)
            wallet.connect("walletconnect")
          }}>Connect to WALLET CONNECT</button>
      </Modal>

      <Modal
        isOpen={modalIsOpen1}
        onAfterOpen={afterOpenModal1}
        onRequestClose={closeModal1}
    style={customStyles}
        contentLabel="Example Modall"
      >
      
          <label>Select which nft id you want to list:</label>
          <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={mintedIdsArray}
        styles={customStyles1}
        
      />
     
       <label>Enter listing price in bnb:</label>
       <div>
       <input  style={{border: "1px solid black", width:"500px", color:"black"}} type={'number'} value={listValue} onChange={(e)=>{
            setListValue(e.target.value)
       }}></input>
       </div>
       {listValue<=lastListedPrice && listValue!=""?
       <text>Please enter a price greater then {lastListedPrice} BNB </text>
       :null}
       <div>
        {listedArrayOfObjects?.length>0?
         <label>Already Listed Token ids</label>
         :null}
         <br/>
         {listedArrayOfObjects?.map((value,i)=>{
          return (
            <>
            <text style={{marginTop:"120px"}}>{value?.token_id}</text> 
            <text style={{paddingLeft:"100px"}}>Price:{value?.listed_price} BNB</text>
            <button style={{    width: "142px",
    height: "30px",
    padding: "0px",
    float: "right"}} onClick={()=>{
      handleCancelListing(value)}
      } >Cancel Listing</button><br/><br/>
            </>
           
          )
         })

         }
         </div>
       <div style={{padding:"40px"}}>
       <button onClick={handleListing} disabled={!(selectedOption && listValue)?true:false}>List now</button>
       
       </div>
       <div >
       <button onClick={()=>{
        closeModal1()
       }}>close</button>
       </div>
       
       

          
       
      </Modal>
      
    </div>
  );
}
