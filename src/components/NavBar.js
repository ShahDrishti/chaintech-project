import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

const NavBar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Navbar.Brand as={Link} to={user ? "/home" : "/login"}>
                SimpleApp
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav className="me-auto">
                    {user && (
                        <>
                            <Nav.Link as={Link} to="/home">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/account">
                                Account
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    )}
                    {!user && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                        </>
                    )}
                </Nav>
                {user && (
                    <Navbar.Text className="ms-auto">
                        Signed in as: <span className="fw-bold">{user.name}</span>
                    </Navbar.Text>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
