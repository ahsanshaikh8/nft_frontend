import React from "react";
import BrandLogo from "./BrandLogo";
import largeP1 from "../Images/phase-1-1-1024x684.png";
import largeP2 from "../Images/phase-2-1-1024x676.png";
import largeP3 from "../Images/Phase-3-1024x676.png";
import largeP4 from "../Images/phase-4-1-1024x677.png";
import Footer from "./Footer";
export default function Roadmap() {
  return (
    <div className="roadmap">
      <BrandLogo />
      <h1>ROAD MAP</h1>
      <div className="phase-container">
        <div className="wpb_wrapper">
          <h1 style={{ color: "#dd8500", textAlign: "center" }}>Phase 1</h1>
          <ul style={{ textAlign: "left" }}>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>MMM launching</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>Token launching on 9 exchanges</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>NFT market</h4>
            </li>
            <li>
              <h4 style={{ color: "white", textAlign: "center" }}>
                Affiliate platform
              </h4>
            </li>
          </ul>
        </div>
        <img className="phase-img" src={largeP1} />
      </div>
      <div className="phase-container reversed">
        <div className="wpb_wrapper">
          <h1 style={{ color: "#dd8500", textAlign: "center" }}>Phase 2</h1>
          <ul style={{ textAlign: "left" }}>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>Social Events and promotions</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>First API preview launch</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>CMC CG listing</h4>
            </li>
            <li>
              <h4 style={{ color: "white", textAlign: "center" }}>
                Project Audit
              </h4>
            </li>
          </ul>
        </div>
        <img className="phase-img" src={largeP2} />
      </div>
      <div className="phase-container">
        <div className="wpb_wrapper">
          <h1 style={{ color: "#dd8500", textAlign: "center" }}>Phase 3</h1>
          <ul style={{ textAlign: "left" }}>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>Steaking pools</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>Rebranding</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>CEX listing</h4>
            </li>
            <li>
              <h4 style={{ color: "white", textAlign: "center" }}>
                Map testing
              </h4>
            </li>
          </ul>
        </div>
        <img className="phase-img" src={largeP3} />
      </div>
      <div className="phase-container reversed">
        <div className="wpb_wrapper">
          <h1 style={{ color: "#dd8500", textAlign: "center" }}>Phase 4</h1>
          <ul style={{ textAlign: "left" }}>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>Metaverse Map Launching</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>App launching</h4>
            </li>
            <li style={{ textAlign: "center" }}>
              <h4 style={{ color: "white" }}>Corporate API</h4>
            </li>
            <li>
              <h4 style={{ color: "white", textAlign: "center" }}>
                Next Phase launching
              </h4>
            </li>
          </ul>
        </div>
        <img className="phase-img" src={largeP4} />
      </div>
      <Footer />
    </div>
  );
}
