import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { signout } from '../../actions'
import authReducer from '../../reducer/auth.reducer'

/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(signout());
    }

    const userLoggedInLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <span className='nav-link' onClick={logout}>Signout</span>
                </li>
                {/* <Nav.Link href="#deets">Signin</Nav.Link>*/}
            </Nav >
        );
    }

    const userNotLoggedInLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <NavLink to='Signup' className='nav-link'>Signup</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='Signin' className='nav-link'>Signin</NavLink>
                </li>
                {/* <Nav.Link href="#deets">Signin</Nav.Link>*/}
            </Nav >
        );
    }


    return (
        <div>
           
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex:2 }}>
                    {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                    <Link to='/' className='navbar-brand'>React-Bootstrap</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                             <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        {auth.authenticate ? userLoggedInLinks() : userNotLoggedInLinks()}
                    </Navbar.Collapse>
                </Navbar>
            
        </div>
    )

}

export default Header