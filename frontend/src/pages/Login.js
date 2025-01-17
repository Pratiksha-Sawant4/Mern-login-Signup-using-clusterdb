import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles.css'; // Import styles

function Login() {
    // Ensure axios requests send credentials like cookies if needed
    axios.defaults.withCredentials = true;

    // State to store form data
    const [formData, setFormData] = useState({ email: '', password: '' });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const { email, password } = formData;

            // Send POST request to backend
            const response = await axios.post('https://mern-login-signup-using-clusterdb-api.vercel.app/api/auth/login', { email, password });

            alert('Login successful');
            console.log(response.data);
        } catch (error) {
            // Handle error by displaying an appropriate message
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="container">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#6a11cb', textDecoration: 'none' }}>
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default Login;
