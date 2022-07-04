import React, { useState } from "react";
import BrandLogo from "./BrandLogo";
import Footer from "./Footer";
import choose from "../Images/choose.jpg";
import MyTextField from "./MyTextField";
import { Checkbox } from "@mui/material";
import { useEffect } from "react";
import MyButton from "./MyButton";
export default function SubmitNft() {
  const [state, setState] = useState({
    name: "",
    description: "",
    amount: 1,
    price: 0,
    author: "",
    isConfirmed: false,
  });
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
              <img
                src={choose}
                loading="lazy"
                width="284"
                sizes="(max-width: 479px) 74vw, 284px"
                id="NFTimage"
                className="image-18"
              />
            </label>
            <input id="file-input" type="file" style={{ display: "none" }} />
            <MyTextField
              onChange={handleChange}
              type="text"
              name="name"
              label="Name"
              placeholder="NFT Name"
            />
            <MyTextField
              onChange={handleChange}
              type="text"
              name="description"
              label="Description"
              placeholder="Description"
            />
            <MyTextField
              onChange={handleChange}
              type="number"
              step="1"
              min="1"
              max={10}
              name="amount"
              label="Amount For Sale"
            />
            <MyTextField
              onChange={handleChange}
              type="text"
              name="price"
              label="Price (25 Minimum)"
              placeholder="Amount of MMM"
            />
            <MyTextField
              onChange={handleChange}
              type="text"
              name="author"
              label="Author"
              placeholder="NFT Copyright Owner"
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
            <MyButton title={"SUBMIT"} />
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
