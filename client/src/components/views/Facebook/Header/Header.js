import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ForumIcon from "@material-ui/icons/Forum";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import NotificationsActiveIcon from "@material-ui/icons/SupervisedUserCircle";
import Axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getPosts } from "../../../../_actions/post_action";
import { USER_SERVER } from "../../../Config";
import "./Header.css";
import SearchFeature from "./SearchFeature";

function Header({ history }) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [SearchTerms, setSearchTerms] = useState("")
  const updateSearchTerms = (newSearchTerm) => {

    const variables = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)

    getPost(variables)
  }

  const getPost = (variables) => {
    setSkip(0)
    dispatch(getPosts(variables))
      .then((res) => {
        // if (res.payload.success) {
        //   if (variables.loadMore) {
        //     updatePost([...posts.posts]);
        //   } else {
        //     setPosts(res.payload.post);
        //   }
        //   setPostSize(res.payload.postSize)
        // } else {
        //   alert("Failed to get Post");
        // }
      });
  }
  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const Logo = require("../../../../assets/images/Penguins.jpg");
  return (
    <div className="header">
      <div className="header__left">
        <img src={Logo} alt ={Logo}/>
        <SearchFeature
          refreshFunction={updateSearchTerms}
        />
      </div>
      <div className="header__center">
        <div className="header__option
        header__option--active">
          <Link to="/"><HomeIcon fontSize="large" /></Link>
        </div>
        <div className="header__option">
          {/* <FlagIcon fontSize="large" /> */}
          <Link to="/join"><ForumIcon fontSize="large" /></Link>
        </div>
        <div className="header__option">
          <Link to="/videos"> <SubscriptionsOutlinedIcon fontSize="large" /></Link>
        </div>
        <div className="header__option">
          <StorefrontOutlinedIcon fontSize="large" />
        </div>
        {user.userData && !user.userData.isAuth ?
          <div className="header__option">
            <Link to="/login">Login</Link>
          </div>
          :

          <div className="header__option">
            <span onClick={logoutHandler}>Logout</span>
          </div>
        }

      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar />
          <h4>Nelson</h4>
        </div>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <Link to="/join"><ForumIcon /></Link>
        </IconButton>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default withRouter(Header);
