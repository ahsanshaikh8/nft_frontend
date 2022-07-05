import React, { useState } from "react";
import strings from "../Helpers/strings.js";
import { NavLink } from "react-router-dom";
import Socials from "./Socials.jsx";
import BrandLogo from "./BrandLogo.jsx";
import MyHomepageButton from "./MyHomepageButton.jsx";
import SignUp from "./SignUp.jsx";
import mainGif from "../Images/main.mp4";
import Footer from "./Footer.jsx";
import useMetamask from "../Hooks/useMetamask.js";
import { useEffect } from "react";
import { getHasCancelledPopUp } from "../Helpers/storage.js";
import { useWallet, UseWalletProvider } from 'use-wallet'
export default function Homepage() {
  const wallet = useWallet()
  // const { connect, disconnect, isActive, account } = useMetamask();
  const [state, setState] = useState({
    showSignupModal: false,
  });
  const showSignUpModal = () => {
    console.log(!state.showSignupModal);
    setState((prev) => ({
      ...prev,
      showSignupModal: !state.showSignupModal,
    }));
  };
  // useEffect(() => {
  //   if (isActive && !getHasCancelledPopUp()) {
  //     console.log("connected to metamask in homepage");
  //     showSignUpModal();
  //   }
  // }, [isActive])
  return (
    <div className="background-video">
      <div className="overlay">
        <BrandLogo />
        <video autoPlay={true} muted loop width="320" height="240" >
          <source src={mainGif} type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
        <div className="homepage-buttons-area">
          <h1 className="hp-h1">
            {" "}
            {strings["home-page-header-L1"]} <br />{" "}
            {strings["home-page-header-L2"]}
          </h1>
          <h2 className="heading-3">
            <span className="bold-text text-span">
              {strings["home-page-sub-header-L1"]}
            </span>
            <br />
            <span className="text-span">
              {strings["home-page-sub-header-L2"]}
            </span>
          </h2>
          <SignUp
            
            show={state.showSignupModal}
            closeModal={() => {
              showSignUpModal();
            }}
          />
          <div className="buttons">
            <NavLink to={"/coming-soon"}>
              <MyHomepageButton
                title={strings["exchanges"].toUpperCase()}
                className="button w-button"
              ></MyHomepageButton>
            </NavLink>
            <NavLink to={"/marketplace"}>
              <MyHomepageButton
                title={strings["market-place"].toUpperCase()}
                className="button w-button"
              ></MyHomepageButton>
            </NavLink>
            <NavLink to={"/my-assets"}>
              <MyHomepageButton
                title={strings["my-assets"].toUpperCase()}
                className="button w-button"
              ></MyHomepageButton>
            </NavLink>
            <NavLink to={"/marketplace"}>
              <MyHomepageButton
                title={strings["buy-assets"].toUpperCase()}
                className="button w-button"
              ></MyHomepageButton>
            </NavLink>
            <MyHomepageButton
              title={strings["game-beta"].toUpperCase()}
              className="button w-button"
              onClick={()=>{
                showSignUpModal();
                console.log(wallet.status)
                if(wallet.status !="connected")
                 wallet.connect();

              }}
            ></MyHomepageButton>
          </div>
        </div>
        <Footer showSocials={true} />*
      </div>
    </div>
  );
}
