import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { Card, Button, Alert } from "react-bootstrap";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getCurrentUser();
    const [showUpdateMsg, setShowUpdateMsg] = useState(
        location.state?.updated || false
    );

    useEffect(() => {
        if (!user) navigate("/login");
        if (showUpdateMsg) {
            const timer = setTimeout(() => setShowUpdateMsg(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [navigate, user, showUpdateMsg]);

    return (
        <Card className="p-4 mx-auto" style={{ maxWidth: 480 }}>
            {showUpdateMsg && (
                <Alert variant="success" className="text-center">
                    Profile updated successfully!
                </Alert>
            )}
            <h2>Welcome to SimpleApp!</h2>
            <p>
                We're glad you've joined us, <strong>{user ? user.name : ""}</strong>.
                <br />
                On this site, you can manage your account and keep your profile up to date.
            </p>
            <p>Your Profile Info:</p>
            <ul>
                <li><b>Name:</b> {user?.name}</li>
                <li><b>Email:</b> {user?.email}</li>
                <li><b>Phone:</b> {user?.phone}</li>
                <li><b>Age:</b> {user?.age}</li>
                <li><b>Gender:</b> {user?.gender}</li>
            </ul>
            <Button as={Link} to="/account" variant="primary" className="w-100">Update Account Info</Button>
        </Card>
    );
}

export default Home;
