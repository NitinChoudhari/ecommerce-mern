import React from 'react'
import Header from '../Header'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css';
import { NavLink } from 'react-router-dom';
/**
* @author
* @function Header
**/

const Layout = (props) => {
  return (
    <>
      <Header />
      {
        props.sidebar ?
          <Container fluid>
            {/* <Row>
          <Col md={2} className='sidebar'>Side bar</Col>
          <Col md={2}>container</Col>
        </Row> */}
            <Col md={1} className='sidebar-class'>
              <div className="container-fluid">
                <div className="row">
                  <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a className="nav-link active" aria-current="page" href="#">
                            <NavLink to={'/'}>Home</NavLink>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <NavLink to={'/category'}>Category</NavLink>

                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" >
                            <NavLink to={'/products'}>Product</NavLink>

                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <NavLink to={'/orders'}>Orders</NavLink>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link">
                            <NavLink to={'/page'}>Page</NavLink>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </Col>
            <Col md={10} style={{ marginLeft: 'auto' }}>
              {props.children}
            </Col>
          </Container>
          :
          props.children
      }
    </>
  )

}

export default Layout