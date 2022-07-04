import React from "react";
import { FaFacebook } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { SiBitcoinsv } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
export default function Socials() {
  return (
    <div className="socials">
      <a target="_blank" rel="noreferrer" href="https://t.me/metamagicmap">
        <img
          src="https://uploads-ssl.webflow.com/608c251f56c48d6d1fcff5cb/608c55804feae4070a3f0792_telegram.png"
          loading="lazy"
          width="35"
          alt=""
          className="social"
        />
      </a>
      <a target="_blank" rel="noreferrer" href="https://t.me/metamagicmap">
        <img
          src="https://uploads-ssl.webflow.com/608c251f56c48d6d1fcff5cb/608c56e64feae45d593f131f_disc.png"
          loading="lazy"
          width="42"
          alt=""
          className="social"
        />
      </a>

      <a
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/metamagicmap"
      >
        <img
          src="https://uploads-ssl.webflow.com/608c251f56c48d6d1fcff5cb/608c56d00ea4497505df279e_twi.png"
          loading="lazy"
          width="37"
          alt=""
          className="social"
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.facebook.com/metamagicmap01"
      >
        <FaFacebook className="social" color="black" size={35} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.instagram.com/metamagicmap/"
      >
        <AiFillInstagram className="social" color="black" size={41} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/META-MAGIC-MAP/Tokken-Smart-Contract/blob/b10d029da4962115bdd7a4964569e8ec97dad6b0/MMM"
      >
        <img
          src="https://uploads-ssl.webflow.com/608c251f56c48d6d1fcff5cb/608c56c2e8573a68280a5116_red.png"
          loading="lazy"
          width="38"
          alt=""
          className="social"
        />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.youtube.com/channel/UC2af_DN3B5oHPTg7vmYmamw"
      >
        <ImYoutube className="social" color="black" size={42} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://bscscan.com/address/0xa6D55d946bCd1c7DA099C9fBbB0696f827c467db"
      >
        <SiBitcoinsv className="social" color="black" size={35} />
      </a>
    </div>
  );
}
