import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { validateEmail, validatePassword, getError as getFieldError, isFormValid as isFormValidWithRules } from "../utils/validators";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [err, setErr] = useState("");
    const [touched, setTouched] = useState({});

    const validators = {
        email: validateEmail,
        password: validatePassword,
    };

    const getError = (field) => getFieldError(validators, field, form);

    const isFormValid = isFormValidWithRules(validators, form);

    const requiredFields = ["email", "password"];
    function markAllTouched() {
        const touchedFields = {};
        requiredFields.forEach((f) => (touchedFields[f] = true));
        setTouched(touchedFields);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        try {
            login(form.email, form.password);
            navigate("/home");
        } catch (err) {
            setErr(err.message);
        }
    };

    return (
        <Card className="p-4 mx-auto" style={{ maxWidth: 400 }}>
            <h3>Login</h3>
            {err && <Alert variant="danger">{err}</Alert>}
            <Form
                onSubmit={handleSubmit}
                noValidate
                onPointerDownCapture={(e) => {
                    const btn = e.target && e.target.closest ? e.target.closest('button[type="submit"]') : null;
                    if (btn && btn.disabled && !isFormValid) {
                        markAllTouched();
                    }
                }}
            >
                <Form.Group>
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
                        Password <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!getError("password")}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {getError("password")}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button
                    className="w-100 mt-3"
                    type="submit"
                    variant="primary"
                    disabled={!isFormValid}
                >
                    Login
                </Button>
                <Link to="/register" className="btn btn-link mt-2 w-100">
                    Register
                </Link>
            </Form>
        </Card>
    );
}

export default Login;
