import React from "react";
import testImg from "../Images/thumbnail.png";
import MyButton from "./MyButton";
export default function SvgCard(props) {
  return (
    <div className="svg-card">
      <img className="nft-image-in-svg-card" src={testImg} alt="NFT pic" />
      <h2 className="nft-title-in-svg-card">Random Dude</h2>
      <div className="market-price">$ 10</div>
      <div className="hovered-info">
        <span className="mb-1">Wallet Address</span>
        <span className="mb-1" style={{ 
          textOverflow: "ellipsis",
          maxWidth: "150px"
        }}>asdajsklbxzj,czba...</span>
        <span className="mb-1">Quantity</span>
        <span className="mb-1">20</span>
        <div className="w-100 text-center mb-1">
          <MyButton fullWidth title={"Stake Now"} />
        </div>
      </div>
    </div>
  );
}
