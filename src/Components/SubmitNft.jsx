import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import Footer from "./Footer";
import choose from "../Images/choose.jpg";
import MyTextField from "./MyTextField";
import { Checkbox } from "@mui/material";
import { useEffect } from "react";
import MyButton from "./MyButton";
import {useDropzone} from 'react-dropzone'
import server from "../apis/server";
import  {useCallback} from 'react'
import CryptoJS from 'crypto-js'
import Select from 'react-select';
import { toast } from 'react-toastify';
const options = [
  { value: 'cars', label: 'Cars' },
  { value: 'land', label: 'Land' },
  { value: 'music', label: 'Music' },
];
const customStyles1 = {
  control: (styles) => ({ ...styles, color: 'white' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: "#fff",
    color: state.isSelected ? "#9FC131" : "#000",

  }),
  input: (styles) => ({ ...styles, color:"white" }),
 
}
export default function SubmitNft() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [file, setFile] = useState(null);
  
  const User1 = JSON.parse(localStorage.getItem("User"))
  const bytes = User1? CryptoJS.AES.decrypt(User1, "userObject"):'';
    const userType = bytes? JSON.parse(bytes.toString(CryptoJS.enc.Utf8)):''
    console.log(userType)
    const userID=userType?._id
    const userName=userType?.name
    const [state, setState] = useState({
      name: "",
      description: "",
      amount: 0,
      author: userName,
      isConfirmed: false,
    });
  function uploadImage() {
    if(!userID)
    {
    toast.error("Please login first to submit your nft")
    return 
    }
    let formdata = new FormData()
    formdata.append("userId", userID);
formdata.append("file",file);
formdata.append("title", state?.name);
formdata.append("description", state?.description);
// formdata.append("price", state?.price);
formdata.append("amount_for_sale", state?.amount);
formdata.append("status",0);
formdata.append("category",selectedOption?.value)
    server.post("users/createNFT", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response =>{
      setFile("")
      setState(
        {
          name: "",
          description: "",
          amount: 0,
          
          author: "",
          isConfirmed: false,
        }
      )
      toast.success("Artwork submitted successfully.")
         console.log(response)
      // setNftImage(response?.data?.artDetail?.file)
      // setArtworkId(response?.data?.artDetail?._id)
      // setDisabled(false)
    })
    };
    const onDrop = useCallback(acceptedFiles => {
      setFile(acceptedFiles[0])
    }, [])
    
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop,multiple:false});
    
      
    const files = acceptedFiles.map(file => ( 
  
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className="submit-nft">
      <div className="submit-top-nav">
        <BrandLogo showOnMobile={false} />
        <div>
          <a href="https://freshdesk.com" target="_blank">
            SUPPORT
          </a>
          <a className="hide-on-mobile">Connected Chain</a>
        </div>
      </div>
      <div className="submit-container">
     
        <h3>Meta Magic Map Art Gallery</h3>
        <p>
          Submit and sell your Art NFT to MetaMagicMap in game Art Gallery.{" "}
          <span>BSC CHAIN ONLY</span>{" "}
          <strong>There is a 20 MMM fee per submission. </strong>
          Please allow up to 24 hours for approvals. MetaMagicMap RESERVES THE
          RIGHT TO PUBLISH TO THE MetaMagicMap ART GALLERY.{" "}
          <span>
            <br />
            INAPPROPRIATE
            <br />
          </span>{" "}
          CONTENT WILL BE REJECTED.
        </p>
        <div className="submit-nft-card">
          <h1>ART GALLERY NFT SUBMIT</h1>
          <div className="submit-nft-choose">
            <label for="file-input">
            
            <div style={{cursor:"pointer"}} {...getRootProps({className: 'dropzone'})}>
              <img
                src={file?URL.createObjectURL(file):choose}
                loading="lazy"
                width="284"
                sizes="(max-width: 479px) 74vw, 284px"
                id="NFTimage"
                className="image-18"
              />
                            </div>
                            
             
                              
            </label>
          
           
            <MyTextField
              onChange={handleChange}
              type="text"
              name="name"
              label="Name"
              placeholder="NFT Name"
              value={state?.name}
            />
            <MyTextField
              onChange={handleChange}
              type="text"
              name="description"
              label="Description"
              placeholder="Description"
              value={state?.description}
            />
           
            <label style={{color:"white", display:"inline"}}>Category:</label>

             <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles1}
       
      />
           
            <MyTextField
              onChange={handleChange}
              type="number"
              step="1"
              min="1"
              max={10}
              name="amount"
              label="Amount For Sale"
              value={state?.amount}
            />
            {/* <MyTextField
              onChange={handleChange}
              type="text"
              name="price"
              label="Price (25 Minimum)"
              placeholder="Amount of MMM"
              value={state?.price}
            /> */}
            <MyTextField
              onChange={handleChange}
              type="text"
              name="author"
              label="Author"
              placeholder="NFT Copyright Owner"
              value={state?.author}
            />
            <div className="submit-confirm">
              <Checkbox
                value={state.isConfirmed}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    isConfirmed: !state.isConfirmed,
                  }))
                }
                sx={{ width: "fit-content" }}
              />
              I Certify that I own the copyright of the image submitted.
            </div>
            <MyButton title={"SUBMIT"} onClick={()=>{
              uploadImage()
            }} disabled={(state?.name && state?.isConfirmed && state?.description && state?.amount  && state?.author && file && selectedOption) ?false:true} />
            <div
              style={{
                color: "#948b8b",
                fontSize: "10px",
              }}
            >20% of sales go towards Meta Magic Map and Art Gallery NFT Holders.</div>
          </div>
        </div>
      </div>
      <Footer showSocials={false} />
    </div>
  );
}
