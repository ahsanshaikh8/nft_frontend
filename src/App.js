import "./CSS/App.css";
import "./CSS/video.css"
import "./CSS/polkacity.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import UserSelling from "./Components/UserSelling";
import StackingPool from "./Components/StackingPool";
import User from "./Components/User";
import Homepage from "./Components/Homepage";
import Marketplace from "./Components/Marketplace";
import Tokens from "./Components/Tokens";
import Roadmap from "./Components/Roadmap";
import SubmitNft from "./Components/SubmitNft";
function App() {
  return (
    <Router>
      <Routes>
        //hello
        <Route path="/" element={<Homepage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-selling" element={<UserSelling />} />
        <Route path="/my-assets" element={<StackingPool />} />
        <Route path="/user" element={<User />} />
        <Route path="/map-beta" element={<Tokens />} />
        <Route path="/road-map" element={<Roadmap />} />
        <Route path="/submit-nft" element={<SubmitNft />} />
      </Routes>
    </Router>
  );
}

export default App;
