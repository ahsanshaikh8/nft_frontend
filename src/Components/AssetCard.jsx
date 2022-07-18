import React, { useState } from "react";
import { getUser } from "../Helpers/storage";
import MyButton from "./MyButton";
import SignUp from "./SignUp";

function AssetCard(props) {
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
      <MyButton
        className="text-white w-50 mt-3 buy-b"
        title={"Buy"}
        onClick={handleBuyClick}
      />
    </div>
  );
}

export default AssetCard;
