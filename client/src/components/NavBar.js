import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);

    return (
        <React.Fragment>
            <Navbar className='navi p-1' bg='dark' variant='dark' expand='lg'>
                <Container fluid>
                    <Navbar.Brand as={Link} to='/'>
                        <span className="mx-3 h2">
                            <FontAwesomeIcon className="home-logo" icon={faHome} />
                            Home City
                        </span>
                    </Navbar.Brand>

                </Container>
            </Navbar>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar'>
                <Nav className='ml-auto'>
                    <Nav.Link as={Link} to='/'>
                        Search Cities
                    </Nav.Link>
                    {/* if user is logged in show saved books and logout */}
                    {Auth.loggedIn() ? (
                        <>
                            <Nav.Link as={Link} to='/profile'>
                                Profile
                            </Nav.Link>
                            <Nav.Link onClick={Auth.logout} as={Link} to='/' >Logout</Nav.Link>
                        </>
                    ) : (
                        <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>


            {/* set modal data up */}
            <Modal
                size='lg'
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='signup-modal'>
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey='login'>
                    <Modal.Header closeButton>
                        <Modal.Title id='signup-modal'>
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Nav variant='pills' className="mb-4">
                            <Nav.Item>
                                <Nav.Link eventKey='login' className="btn-link">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='signup' className="btn-link">Sign Up</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey='login'>
                                <LoginForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey='signup'>
                                <SignUpForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </React.Fragment>
    );
};

export default AppNavbar;
