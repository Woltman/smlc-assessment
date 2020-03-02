import React from "react";

export default function ActivityIndicator({ displayPercentage }) {
  return (
    <div className="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <p style={{ lineHeight: "80px", textAlign: "center", color: "#ccc" }}>
        {displayPercentage}%
      </p>
    </div>
  );
}
