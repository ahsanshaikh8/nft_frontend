import React from "react";
import avatar from "../Images/avatar 1.png";
export default function UserNftCard(props) {
  return (
    <div className="user-nft-card user-nft-position ">
      <img src={avatar} />
      <div className="d1">
        <span className="mb-2">User Name</span>
        <div className="d-flex flex-column w-100">
          <span>Floor Price</span>
          <span>$ 0000</span>
        </div>
        <div className="d-flex flex-column">
          <span>Wallet Address</span>
          <span>asdajsklbxzj,czbhjsafgd7</span>
        </div>
      </div>
      <div className="d2">
        <span>Market Price</span>
        <span>$ 0000</span>
      </div>
    </div>
  );
}
