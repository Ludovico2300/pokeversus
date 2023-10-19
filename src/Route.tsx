import React from "react";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

export default function Route() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div
          className="w-full flex flex-col justify-around items-center h-[80vh]"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/pokeball.webp)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            position: "absolute",
            top: "10vh",
            bottom: "10vh",
            left: "0",
            right: "0",
            overflow: "auto",
          }}
        >
          <App />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
