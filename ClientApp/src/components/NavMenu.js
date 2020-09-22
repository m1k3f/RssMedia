import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
// import './NavMenu.css';

export class NavMenu extends Component {
  //static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.state = {
      
    };
  }

  render () {
    return (
      <header>
        {/* 
        Title? (left)
        Github link (right) 
        */}
        <a href="https://github.com/m1k3f/RadioPlayer-Web">
            <img src="../images/GitHub-Mark-32px.png" />
        </a>
      </header>
    );
  }
}
