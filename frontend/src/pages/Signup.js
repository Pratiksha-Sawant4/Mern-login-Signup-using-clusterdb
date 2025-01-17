import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

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

    const [loading, setLoading] = useState(false); // Added loading state
    const [errorMessage, setErrorMessage] = useState(''); // Added error state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Clear previous error
        setErrorMessage('');

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            // Extracting values from formData
            const { name, email, mobile, address, password } = formData;

            // Sending a POST request to your backend
            const response = await axios.post('https://mern-login-signup-using-clusterdb-api.vercel.app/api/auth/signup', {
                name,
                email,
                mobile,
                address,
                password
            });

            alert(response.data.message);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false); // Stop loading
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Error message */}
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
