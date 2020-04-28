import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavbarText, Navbar, Nav, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';

class MyNav extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render(){

        const linkStyle ={
            color: "black",
            margin: 10
        }

        return(
            <div>
                <Navbar color="light" light expand="md" style={{position: 'fixed', width: '100%', zIndex: 1}}>
                    <NavbarBrand href="/" > Yelp Review </NavbarBrand>
                    
                    <NavbarToggler onClick={this.toggle.bind(this)} />
                    
                    <Collapse isOpen={this.state.isOpen} navbar>
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
                    </Collapse>

                </Navbar>
            </div>
        );
    }
}

export default MyNav;