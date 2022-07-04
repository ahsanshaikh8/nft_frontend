import React, { useEffect, useState } from "react";
import AssetCard from "./AssetCard";
import Loader from "./Loader";
const a = require("../Helpers/MOCK_DATA.json");
export default function MetamaskListing() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAssets(a);
      setIsLoading(false);
    }, 4000);
  }, []);
  return isLoading ? (
    <div className="asset-listing">
      <Loader />
    </div>
  ) : (
    <div className="asset-listing">

      {assets.map((asset) => (
        <AssetCard {...asset} key={asset.name + asset.price} />
      ))}
    </div>
  );
}
