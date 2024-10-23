import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './signups.css'; // Importing CSS file for styling


const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(4, 'Password must be at least 4 characters long'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    name: Yup.string(), // Optional field
    profilePicture: Yup.mixed(), // Optional profile picture
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { username, email, password } = values;

    try {
      const response = await axios.post('http://localhost:5000/signup', { username, email, password });
      setMessage(response.data.message);

      // Simulate sending a welcome email
      console.log(`Welcome email sent to ${email}`);

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/'); // Redirect to login page
      }, 1000);
    } catch (error) {
      setErrors({ submit: error.response ? error.response.data : 'Server error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up for MelodyVerse</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          profilePicture: null,
          terms: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" placeholder="Enter your username" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field name="confirmPassword" type="password" placeholder="Confirm your password" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name (Optional)</label>
              <Field name="name" type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture (Optional)</label>
              <input
                type="file"
                name="profilePicture"
                onChange={(event) => setFieldValue('profilePicture', event.target.files[0])}
              />
            </div>

            <div className="form-group terms">
              <Field type="checkbox" name="terms" />
              <label htmlFor="terms">I accept the <a href="/terms">terms and conditions</a></label>
              <ErrorMessage name="terms" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>

            {message && <p className="success-message">{message}</p>}
            <ErrorMessage name="submit" component="div" className="error-message" />
          </Form>
        )}
      </Formik>

      <p className="redirect-text">
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
};

export default Signup;
