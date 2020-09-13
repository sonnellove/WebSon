import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import "./App.css";
import Body from "./views/Facebook/Body";
import Header from './views/Facebook/Header/Header';
import VideosBody from './views/Facebook/Videos/VideosBody';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Chat from './views/Messenger/Chat/Chat';
import Join from './views/Messenger/Join/Join';
import ChatContainer from './views/Messenger/Chat/ChatContainer';

function App() {
  // const Logo = require("../../../assets/images/Penguins.jpg");
  const Logo = require("../assets/images/Penguins.jpg");
  return (
    <div className="app">
      <Suspense fallback={(<div>Loading...</div>)}>
      {/* Header */}
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(Body, null)} />
          <Route exact path="/videos" component={Auth(VideosBody, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/join" component={Auth(Join, null)} />
          <Route path="/chat" component={Auth(ChatContainer, null)} />
          {/* <Route exact path="/image/:postId" component={Auth(PostImage, null)} /> */}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
