import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Navibar = () => {
    return (
        <Navbar bg="dark" variant="dark" className='mb-3'>
        <Navbar.Brand href="/">ASL Translator</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/classification-history">Images</Nav.Link>
        </Nav>
        </Navbar>
    );
}
 
export default Navibar;