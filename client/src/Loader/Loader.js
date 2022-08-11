import React from "react";
import { Rings } from "react-loader-spinner";
const Loader = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "none",
      }}
    >
      <Rings
        color="#d32f2f"
        style={{ height: "100vh" }}
        height={80}
        width={80}
      />
    </div>
  );
};

export default Loader;
