import React from "react";
import BrandLogo from "./BrandLogo";
import phone from "../Images/phone2.png";
import token from "../Images/token.png";
import Footer from "./Footer";
export default function Tokens() {
  return (
    <div className="tokens">
      <BrandLogo showOnMobile={true} />
      <h3>Meta-Magic-Map</h3>
      <h4>A community-verified registry of crowdsourced places.</h4>
      <div className="tokens-image-holder">
        <img
          src={phone}
          className="vc_single_image-img attachment-large"
          alt=""
          loading="lazy"
          width="422"
          height="859"
        />
        <img
          src={token}
          className="vc_single_image-img2"
          alt=""
          loading="lazy"
          width="422"
          height="859"
        />
      </div>
      <h3 className="w-100 text-center pb-4">Coming Soon...</h3>
      <Footer />
    </div>
  );
}
