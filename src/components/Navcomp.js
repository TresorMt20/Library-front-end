import { faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default class Navcomp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    
    render() {
        return (
            <div>
                <Navbar bg="ligth" variant="ligth">
                    <Link to={"welcome"} className="navbar-brand">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png" width="25" height="25"/>Library
                    </Link>
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Add Book</Link>
                    <Link to={"list"} className="nav-link">Book list</Link>
                    <Link to={"view-cart"} className="nav-link">Cart Items</Link>
                    <Link to={"users"} className="nav-link">User List</Link>
                </Nav>
                <Nav className="navbar-right">
                    
                    <Link to={"log-out"} className="nav-link"><FontAwesomeIcon icon={faSignOutAlt}/>Log out</Link>
                </Nav>
                </Navbar>
            </div>
        )
    }
}
