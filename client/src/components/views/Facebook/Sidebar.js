import ChatIcon from "@material-ui/icons/Chat";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PeopleIcon from "@material-ui/icons/People";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow/SidebarRow';

function Sidebar() {
  const Logo = require("../../../assets/images/Penguins.jpg");

    return (
        <div className="sidebar">
            <SidebarRow src={Logo} title="Nelson Fernadez"/>
            <SidebarRow Icon={LocalHospitalIcon} title="COVID-19 Information Center"/>
            <SidebarRow Icon={EmojiFlagsIcon} title="Pages"/>
            <SidebarRow Icon={PeopleIcon} title="Friends"/>
            <SidebarRow Icon={ChatIcon} title="Messager"/>
            <SidebarRow Icon={StorefrontIcon} title="Marketplace"/>
            <SidebarRow Icon={VideoLibraryIcon} title="Videos"/>
            <SidebarRow Icon={ExpandMoreOutlined} title="Marketplace"/>
         
        </div>
    )
}

export default Sidebar
