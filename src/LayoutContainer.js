// Developer TODO: Define App component defintion here
import React, { Component } from 'react';
import NavBar from './NavBar.js'
import HomeContent from './HomeContent.js'
import LoggedInContainer from './LoggedInContainer.js'
import ProfileContainer from './ProfileContainer.js'
import axios from 'axios'
import {browserHistory} from 'react-router';
// import './Home.css';
// import SearchContainer from './SearchContainer.js'

class LayoutContainer extends Component {
  //constructor should always be the first one fix levi's problem
  constructor(props) {
    super(props);
    this.state = {
      username: '', password: '',id:'',newPostTitle: '', newPostDescription:'', isAuthenticated:false, isProfile:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitLog = this.handleSubmitLog.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
     this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleHomeBtnOnClick = this.handleHomeBtnOnClick.bind(this);
  }
     cookieLogIn(){
    let userCookie = this.getCookie("Veggie");
    console.log("cookieLogIn: ", userCookie);
    axios.post(`http://localhost:3001/login`, userCookie)
    .then(res => {
      console.log('res is ', res);
      console.log('test: ', res.data._id)
      this.setState({isAuthenticated: true, id:res.data._id, username:res.username});
        console.log("got an cookie!!!log in!!")
    }, err => {
      console.log('oops!');
      console.log(err);
    });
  }

  componentDidMount() {
    this.cookieLogIn();
  }

  setCookie(cname, cvalue, expireDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

  getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              console.log("watch: ", c)

                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.password===this.state.password1){
    let username = this.state.username;
    let password = this.state.password;
    console.log(this.state.username);
     axios.post(`http://localhost:3001/signup`, {username:username, password:password})
    .then(res => {
      console.log('res is ', res);
      // browserHistory.push('/');
    }, err => {
      console.log(err);
    });
  }}
    handleSubmitLog(e){
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;
  axios.post(`http://localhost:3001/login`, {username:username, password:password})
    .then(res => {
      console.log('res is ', res);
      this.setState({isAuthenticated: true, id:res.data._id});
      this.setCookie('Veggie', `username=${username}&password=${password}`,0.03);
    }, err => {
      console.log('oops!');
      console.log(err);
    });
  }
  handleLogout(e){
    e.preventDefault();
      this.setState({isAuthenticated: false, id:''});
       this.setCookie('Veggie','',0.03)
  }
    handleUsernameChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
    handlePasswordConfirm(e){
    this.setState({password1: e.target.value});
  }
    handleSubmitPost(e){
    e.preventDefault();
    let title = this.state.newPostTitle;
    let description = this.state.newPostDescription;
    let user = this.state.id;
     console.log(title)
     console.log(user)
    axios({
      method: 'POST',
      url: `http://localhost:3001/api/status`,
      data: {
        title: title,
        description: description,
        userId: user
      }
    })
    .then(res => {
      console.log('res is ', res);
      this.setState({newPostTitle: '', newPostDescription:''});
    }, err => {
      console.log(err);
    });
  }
  handleTitleChange(e){
    this.setState({newPostTitle: e.target.value});
  }
  handleDescriptionChange(e){
    this.setState({newPostDescription: e.target.value});
  }

  buttonOnClick(e){
    this.setState({isAuthenticated: !this.state.isAuthenticated})
  }

  handleProfileBtnOnClick(e){
    e.preventDefault();
    this.setState({isProfile:true})
  }

  handleHomeBtnOnClick(e){
    e.preventDefault();
    this.setState({isProfile:false})
  }

  navBarControler(){
    let thingsToPrint = "";
    if(!this.state.isAuthenticated){
      if(document.getElementById("log-out-btn"))document.getElementById("log-out-btn").style.display = "none";
      if(document.getElementById("log-in-btn"))document.getElementById("log-in-btn").style.display = "";
      if(document.getElementById("profile-btn"))document.getElementById("profile-btn").style.display = "none";
      thingsToPrint = <HomeContent />
    }else if(this.state.isAuthenticated && this.state.isProfile){
      if(document.getElementById("log-in-btn")) document.getElementById("log-in-btn").style.display = "none";
      if(document.getElementById("log-out-btn"))document.getElementById("log-out-btn").style.display = "";
      if(document.getElementById("profile-btn"))document.getElementById("profile-btn").style.display = "";
      thingsToPrint = <ProfileContainer />
    }else{
      if(document.getElementById("log-in-btn")) document.getElementById("log-in-btn").style.display = "none";
      if(document.getElementById("log-out-btn"))document.getElementById("log-out-btn").style.display = "";
      if(document.getElementById("profile-btn"))document.getElementById("profile-btn").style.display = "";
      thingsToPrint = <LoggedInContainer

        handleSubmitPost = {this.handleSubmitPost.bind(this)}
        handleTitleChange = {this.handleTitleChange.bind(this)}
        handleDescriptionChange = {this.handleDescriptionChange.bind(this)}

      />
    }
    return thingsToPrint;
  }

  render() {
    let layOut = this.navBarControler();
    <LoggedInContainer />

    return (
      <div>

        <NavBar
          handleSubmit = {this.handleSubmit.bind(this)}
          handleSubmitLog = {this.handleSubmitLog.bind(this)}
          handlePasswordChange = {this.handlePasswordChange.bind(this)}
          handleUsernameChange = {this.handleUsernameChange.bind(this)}
          handlePasswordConfirm = {this.handlePasswordConfirm.bind(this)}
          handleLogout = {this.handleLogout.bind(this)}
          handleProfileBtnOnClick = {this.handleProfileBtnOnClick.bind(this)}
          handleHomeBtnOnClick = {this.handleHomeBtnOnClick.bind(this)}
        />
      {layOut}

      </div>
    );
  }
}

export default LayoutContainer;
