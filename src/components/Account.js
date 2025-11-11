import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCurrentUser,
    logout,
    updateUser,
} from "../services/authService";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { validateName, validateEmail, validatePhone, validateAge, getError as getFieldError, isFormValid as isFormValidWithRules } from "../utils/validators";

function Account() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        name: "",
        password: "",
        phone: "",
        age: "",
        gender: "",
    });
    const [prevData, setPrevData] = useState(null);
    const [touched, setTouched] = useState({});
    const [err, setErr] = useState("");


    const validators = {
        name: validateName,
        email: validateEmail,
        phone: validatePhone,
    };

    const getError = (field) => getFieldError(validators, field, form);

    const isFormValid = isFormValidWithRules(validators, form);

    useEffect(() => {
        const user = getCurrentUser();
        if (!user) {
            navigate("/login");
            return;
        }
        setForm({
            email: user.email || "",
            name: user.name || "",
            password: user.password || "",
            phone: user.phone || "",
            age: user.age || "",
            gender: user.gender || "",
        });
        setPrevData(user);
    }, [navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            updateUser(form, prevData.email);
            if (
                form.email !== prevData.email ||
                form.password !== prevData.password
            ) {
                logout();
                navigate("/login");
            } else {
                navigate("/home", { state: { updated: true } });
            }
        } catch (error) {
            setErr("Something went wrong. Please try again.");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Card className="p-4 mx-auto" style={{ maxWidth: 400 }}>
            <h3>Edit Account Info</h3>
            {err && <Alert variant="danger">{err}</Alert>}
            <Form
                onSubmit={handleSubmit}
                noValidate
                onPointerDownCapture={(e) => {
                    const btn = e.target && e.target.closest ? e.target.closest('button[type="submit"]') : null;
                    if (btn && btn.disabled && !isFormValid) {
                        setTouched({ ...touched, name: true, email: true, phone: true });
                    }
                }}
            >
                <Form.Group>
                    <Form.Label>
                        Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        isInvalid={touched.name && !!getError("name")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {getError("name")}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>
                        Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!getError("email")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {getError("email")}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>
                        Phone <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        isInvalid={touched.phone && !!getError("phone")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {getError("phone")}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        name="age"
                        type="number"
                        value={form.age}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        isInvalid={touched.age && !!validateAge(form.age)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validateAge(form.age)}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep unchanged"
                    />
                </Form.Group>
                <Button
                    className="w-100 mt-3"
                    type="submit"
                    variant="primary"
                    disabled={!isFormValid}
                >
                    Update
                </Button>
                <Button
                    variant="link"
                    className="mt-2 w-100"
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Form>
        </Card>
    );
}

export default Account;
