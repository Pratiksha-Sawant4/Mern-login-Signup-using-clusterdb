import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles.css'; // Import styles

function Signup() {
    axios.defaults.withCredentials = true;
   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',           
        address: '',          
        password: '',
        confirmPassword: '', 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Extracting values from formData
            const { name, email, mobile, address, password, confirmPassword } = formData;

            // Sending a POST request to your backend
            const response = await axios.post('https://mern-login-signup-using-clusterdb-api.vercel.app/api/auth/signup', {
                name,
                email,
                mobile,
                address,
                password,
                confirmPassword
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={handleChange}
                    value={formData.mobile}
                    required
                />
                <textarea
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    value={formData.address}
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#6a11cb', textDecoration: 'none' }}>
                    Log In
                </Link>
            </p>
        </div>
    );
}

export default Signup;
