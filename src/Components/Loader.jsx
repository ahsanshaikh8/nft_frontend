import React from "react";

export default function Loader() {
  return (
    <div className="spinner-border text-primary" role="status" style={{scale: 2}}>
      <span className="sr-only" ></span>
    </div>
  );
}
