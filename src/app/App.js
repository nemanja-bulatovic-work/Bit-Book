import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import PostsFeed from './components/PostsFeed/PostsFeed';
import SinglePost from './components/PostsFeed/SinglePost';
import MyProfile from './components/Profile/MyProfile'
import PeoplePage from './components/PeoplePage';
import RegisterPage from './components/Register';
import UserProfile from './components/Profile/UserProfile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: localStorage.getItem('user') ? true : false,
    }

    this.logIn = this.logIn.bind(this)
  }

  logIn() {
    this.setState((prevState) => {
      return {
        logged: !prevState.logged
      }

    })
  }

  render() {
    if (!this.state.logged) {
      return (
        <Route path='/' render={(props) => {
          return <RegisterPage logIn={this.logIn} />
        }} />
      )
    }

    return (
      <>
        <Header />
        <main className='container'>
          <Switch>
            <Route path='/people' component={PeoplePage} />
            <Route path='/profile/:id' component={UserProfile} />
            <Route path='/profile' component={MyProfile} />
            <Route path='/feeds/:id' component={SinglePost} />
            <Route path='/' component={PostsFeed} />
          </Switch>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
