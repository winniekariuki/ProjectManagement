import React, { Component } from "react";
import './navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <div class="topnav" id="myTopnav">
          <a href="/home" class="active">
            Accounts
          </a>
          <a href="/opportunities">Opportunities</a>
          <a href="/">Logout</a>
        </div>
      </div>
    );
  }
}
