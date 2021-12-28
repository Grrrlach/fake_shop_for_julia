import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';


class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar as={Link} to="/">MG's Fake Shop</Navbar>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        {this.props.token ?
                            <>
                            <p style={{color:"azure"}}><b>{this.props.userFullName ? this.props.userFullName : localStorage.getItem('name')}</b></p>

                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                            :
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
