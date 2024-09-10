// src/Navbar.js
import React from 'react';
import { Navbar } from 'flowbite-react';
import logo from './carelon.png'

const MyNavbar = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img
          src={logo} // Replace with your logo URL
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        
      </Navbar.Brand><span class="text-xl font-semibold dark:text-white text-center flex-grow..."  >
          Chat with HEDIS Manual
        </span>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/services">Services</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;