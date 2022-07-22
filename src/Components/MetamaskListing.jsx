import React, { useEffect, useState } from "react";
import AssetCard from "./AssetCard";
import server from "../apis/server";
import Loader from "./Loader";
const a = require("../Helpers/MOCK_DATA.json");

export default function MetamaskListing() {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [componentLoader,setComponentLoader]=useState(false)
  const [marketplaceData,setMarketPlaceData]=useState([])
  useEffect(() => {
    getMArketplaceItems();

  }, [componentLoader]);
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        //hello
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
  const getMArketplaceItems=async ()=>{
    const {data}=await server.post("users/getAllNftsForMarketplace",
    {
   },
           {
             headers: {
               "Content-Type": "application/json",
             },
           }
         )
         if(data)
         {
          setIsLoading(false);
          const array=data?.data
          shuffleArray(array)
          console.log(array)
          setMarketPlaceData(array)
          console.log(data?.data)
         }
  }
  return isLoading ? (
    <div className="asset-listing">
      <Loader />
    </div>
  ) : (
    <div className="asset-listing">

      {marketplaceData?.length==0?
      <text style={{color:"white"}} >No assets in the marketplace</text>
      :
      marketplaceData.map((asset) => (
        <AssetCard data={asset} loader={componentLoader} setloader={setComponentLoader} />
      ))}
    </div>
  );
}
