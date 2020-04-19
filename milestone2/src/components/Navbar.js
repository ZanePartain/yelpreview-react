import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavbarText, Navbar, Nav, NavbarBrand, NavLink } from 'reactstrap';

class MyNav extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){

        const linkStyle ={
            color: "black",
            margin: 10
        }

        return(
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/" > Yelp Review </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem style={linkStyle}>
                            <Link style={{color: 'black'}} to="/"> 
                                <li>Yelp</li>
                            </Link>
                        </NavItem>
                        <NavItem style={linkStyle}>
                            <Link style={{color: 'black'}} to="/user"> 
                                <li>User</li> 
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MyNav;