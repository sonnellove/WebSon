import React from "react";
import "./Body.css";
import Feed from "./Feed";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function Body() {
  const Logo = require("../../../assets/images/Penguins.jpg");
  return (
    <>
      <div className="body__body">
        {/* SideBar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgetss */}
        <Widgets />
      </div>
      <Footer />
    </>

  );
}

export default Body;
