import React, { useState } from "react";
import { getUser } from "../Helpers/storage";
import MyButton from "./MyButton";
import SignUp from "./SignUp";

function AssetCard(props) {
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
  const handleBuyClick = (e) => {
    const isLogined = Boolean(getUser());
    if (!isLogined) {
      showSignUpModalF();
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
      <SignUp
        show={state.showSignUpModal}
        closeModal={() => {
          showSignUpModalF();
        }}
      />
      <img src={props.image} alt="drone" width={"235px"} height={"140px"} />
      <p className="asset-title">{props.name} </p>
      <p className="asset-detail">PRICE: {props.price}</p>
      <p className="asset-detail">Serial: {props.serial}</p>
      {/* {showBuy && <MyButton className="text-white w-50 mt-3" title={"Buy"} />} */}
      <MyButton
        className="text-white w-50 mt-3 buy-b"
        title={"Buy"}
        onClick={handleBuyClick}
      />
    </div>
  );
}

export default AssetCard;
