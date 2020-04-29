import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "rbx/index.css";

import { AuthContext } from "./context/auth";
import PrivateRoute from './PrivateRoute';

import Main from './components/Main';
import NewBlogPost from './components/NewBlogPost';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NavBar from "./components/NavBar";
import SearchResults from './components/SearchResults';

export default function App() {
  return (
    <AuthContext.Provider value={true}>
    <Router>
      <NavBar />
      <div>
          <Switch>
            <Route path="/" exact={true} component={Main}/>
            <Route path="/search" component={SearchResults}/>
            <Route path="/posts/:id" component={BlogPost}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/dashboard" component={Dashboard}/>
            <PrivateRoute path="/dashboard/new" component={NewBlogPost}/>
          </Switch>
      </div>
    </Router>
    </AuthContext.Provider>
  );
}
