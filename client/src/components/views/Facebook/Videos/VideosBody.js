import React from "react";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar";
import Widgets from "../Widgets";
import FeedVideos from "./FeedVideos";
import "./VideosBody.css";

function VideosBody() {
  const Logo = require("../../../../assets/images/Penguins.jpg");
  return (
    <>
      <div className="Videosbody__body">
        {/* SideBar */}
        <Sidebar />
        {/* Feed */}
        <FeedVideos />
        {/* Widgetss */}
        <Widgets />
      </div>
      <Footer />
    </>

  );
}

export default VideosBody;
