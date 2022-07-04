import { useMediaQuery } from "react-responsive";
import React from "react";
import BrandLogo from "./BrandLogo";
import Footer from "./Footer";
import SvgCard from "./SvgCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getUser } from "../Helpers/storage";
export default function StackingPool() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 600px)" });
  const navigator = useNavigate();
  useEffect(() => {
    if (!getUser()) {
      navigator("/login", { replace: true });
    }
  }, []);
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
        <SvgCard />
        <SvgCard />
        <SvgCard />
        <SvgCard />
        <SvgCard />
      </div>
      <div className="stacking-pool-coins-img" />
      <Footer showSocials={false} />
    </div>
  );
}
