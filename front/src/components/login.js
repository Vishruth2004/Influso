import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css'; // Import the CSS file

const Login = () => {
  const navigate = useNavigate(); 
  const [submitError, setSubmitError] = useState(''); // State for submission errors

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters long'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, password, rememberMe } = values;

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token

      // Set "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberMe', email); // Store email for future logins
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Redirect to home
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSubmitError(error.response.data); // Show backend error message (like "Invalid credentials")
      } else {
        setSubmitError('An error occurred. Please try again.'); // Show a general error message
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
        <h2>Login for MelodyVerse</h2>
        <Formik
            initialValues={{ email: localStorage.getItem('rememberMe') || '', password: '', rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
            <Form>
                <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="error" />
                </div>
                <div>
                <Field type="checkbox" name="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
                {submitError && <div className="error">{submitError}</div>}
            </Form>
            )}
        </Formik>
        <p>
            <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p>
            Don't have an account? <a href="/signup">Sign up</a>
        </p>
        </div>

  );
};

export default Login;
