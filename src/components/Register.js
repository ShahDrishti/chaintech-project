import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, login } from "../services/authService";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { validateName, validateEmail, validatePhone, validateAge, getError as getFieldError, isFormValid as isFormValidWithRules } from "../utils/validators";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        age: "",
        gender: "",
    });
    const [err, setErr] = useState("");
    const [touched, setTouched] = useState({});

    const validators = {
        name: validateName,
        email: validateEmail,
        phone: validatePhone,
    };

    const getError = (field) => getFieldError(validators, field, form);

    const isFormValid = isFormValidWithRules(validators, form);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setTouched({ ...touched, [e.target.name]: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        try {
            register(form);
            login(form.email, form.password);
            navigate("/home");
        } catch (err) {
            setErr(err.message);
        }
    };

    return (
        <Row className="justify-content-center">
            <Col md={5} className="mb-4">
                <Card className="h-100 p-4" bg="light" border="primary">
                    <h4 className="mb-3 text-primary">Join SimpleApp 🚀</h4>
                    <p>
                        Start your journey with us —<br /><strong>free, safe, and simple.</strong>
                    </p>
                    <ul>
                        <li>✔️ Manage your account effortlessly</li>
                        <li>✔️ Stay updated and connected</li>
                        <li>✔️ Your privacy, our priority</li>
                    </ul>
                    <p>
                        <em>
                            "Join a growing community. <br />
                            Take charge of your digital identity!"
                        </em>
                    </p>
                </Card>
            </Col>

            <Col md={5}>
                <Card className="p-4 shadow">
                    <h3>Register</h3>
                    {err && <Alert variant="danger">{err}</Alert>}
                    <Form onSubmit={handleSubmit} noValidate>
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
                                placeholder="Min 6 characters"
                            />
                        </Form.Group>
                        <Button
                            className="w-100 mt-3"
                            type="submit"
                            variant="primary"
                            disabled={!isFormValid}
                        >
                            Register
                        </Button>
                        <Link to="/login" className="btn btn-link mt-2 w-100">
                            Back to Login
                        </Link>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}
export default Register;
